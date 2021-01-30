package handlers

import (
	"log"
	"net/http"

	"github.com/Shahriar-shudip/alocmedia/db"
)

type UsersHandler struct {
	l *log.Logger
}

func NewUserHandler(l *log.Logger) *UsersHandler {
	return &UsersHandler{l}
}

func (u *UsersHandler) InsertUser(w http.ResponseWriter, r *http.Request) {
	user := &db.User{}
	err := user.FromJson(r.Body)

	if err != nil {
		http.Error(w, "unable to parse the json body", http.StatusBadRequest)
	}
	err = user.InsertUser()
	if err != nil {
		u.l.Fatal(err)
		http.Error(w, "User was not inserted ", http.StatusBadRequest)
	}
}
