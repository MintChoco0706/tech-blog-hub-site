package main

import (
	"log"
	"sync"

	pb "crawler/generated" // {module_name}/package

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// address := os.Getenv("GRPC_SERVER_ADDRESS")
	address := "localhost:50051"
	conn, err := grpc.NewClient(address, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	stub := pb.NewCrawlerTextHandlerClient(conn)

	// read crawler info from config file
	configFilePath := "./config-crawler.yaml"
	crawlerArrayAddress := getCrawlerArrayAddressFromFile(configFilePath)

	// run all crawlers
	var wg sync.WaitGroup
	for i := range crawlerArrayAddress.Crawlers {
		wg.Add(1)
		go func(crawler *Crawler) {
			defer wg.Done()
			crawler.Run(&stub)
		}(&crawlerArrayAddress.Crawlers[i])
	}
	wg.Wait() // wait until all crawlers end

	// save changed crawler info
	writeCrawlerInfoToFile(configFilePath, crawlerArrayAddress)
}
