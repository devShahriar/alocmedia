package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/Shahriar-shudip/alocmedia/handlers"
	cors "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	l := log.New(os.Stdout, "Auth api", log.LstdFlags)

	userHandler := handlers.NewUserHandler(l)

	sm := mux.NewRouter() //return a new router instance

	postUser := sm.Methods(http.MethodPost).Subrouter()
	postUser.HandleFunc("/insert/user", userHandler.InsertUser)
	origin := []string{"*"}
	ch := cors.CORS(cors.AllowedOrigins(origin))

	server := http.Server{
		Addr:         ":9000",
		Handler:      ch(sm),
		IdleTimeout:  123 * time.Second,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			l.Fatal(err)
		}
	}()

	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan
	log.Println("gracful shutdown", sig)
	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	server.Shutdown(tc) // shuts the server when users has done with the request
}
