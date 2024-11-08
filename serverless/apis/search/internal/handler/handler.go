package handler

import (
	"context"
	"encoding/json"
	"strconv"
	"strings"

	"searchAPI/internal/model"
	"searchAPI/internal/service"
	"searchAPI/internal/utils"

	"github.com/aws/aws-lambda-go/events"
	"github.com/google/uuid"
)

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Check for X-User-Id in the request headers
	userId := request.Headers["x-user-id"]
	if userId == "" {
		// If X-User-Id is not present, generate a new UUID v4
		userId = uuid.New().String()
	}

	// Log the request with user ID and all query parameters
	utils.LogRequest(userId, request.QueryStringParameters)

	// parse query params that concerns
	var hashtags []string
	if hashtagParam := request.QueryStringParameters["hashtags"]; hashtagParam != "" {
		hashtags = strings.Split(hashtagParam, ",")
	} else {
		hashtags = []string{}
	}
	company := request.QueryStringParameters["company"]
	query := request.QueryStringParameters["query"]
	page, _ := strconv.Atoi(request.QueryStringParameters["page"])
	size, _ := strconv.Atoi(request.QueryStringParameters["size"])

	// Validate input parameters
	if err := utils.ValidateParams(hashtags, company, query, page, size); err != nil {
		return errorResponse(400, err.Error(), userId)
	}

	// Perform search
	articleInfos, totalElements := service.PerformSearch(hashtags, company, query, page, size)

	// Prepare response
	response := model.SearchResponse{
		Status:  200,
		Message: "Success",
		Content: model.Content{
			ArticleInfos: articleInfos,
			Pageable: model.Pageable{
				PageNumber:    page,
				PageSize:      size,
				TotalElements: totalElements,
				TotalPages:    (totalElements + size - 1) / size,
			},
		},
	}

	// Serialize response to JSON
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		return errorResponse(500, "Error serializing response", userId)
	}

	// Return successful response
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
			"X-User-Id":    userId,
		},
		Body: string(jsonResponse),
	}, nil
}

func errorResponse(statusCode int, message string, userId string) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Headers: map[string]string{
			"X-User-Id": userId,
		},
		Body: string(model.NewErrorResponse(statusCode, message)),
	}, nil
}
