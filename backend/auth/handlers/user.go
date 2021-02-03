package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/devShahriar/alocmedia/backend/auth/db"
	"github.com/go-playground/validator/v10"
)

type UsersHandler struct {
	l *log.Logger
}

var validate *validator.Validate

func NewUserHandler(l *log.Logger) *UsersHandler {
	return &UsersHandler{l}
}

//Login checker
func (u *UsersHandler) Login(w http.ResponseWriter, r *http.Request) {
	userinfo := &db.UserLogin{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(userinfo)
	if err != nil {
		http.Error(w, "a", http.StatusBadRequest)
	}
	res, err := userinfo.LoginUser()
	w.Header().Set("Content-Type", "application/json")
	if res {
		Msg := &db.LoginMsg{"Valid"}
		msgJson, _ := json.Marshal(Msg)
		w.Write(msgJson)
	} else {
		Msg := &db.LoginMsg{"invalid user"}
		msgJson, _ := json.Marshal(Msg)
		w.Write(msgJson)

	}

}

//Sign in User Handler
func (u *UsersHandler) InsertUser(w http.ResponseWriter, r *http.Request) {
	user := &db.User{}
	err := user.FromJson(r.Body)

	if err != nil {
		http.Error(w, "unable to parse the json body", http.StatusBadRequest)
	}
	validate = validator.New()
	fmt.Println(user)
	errs := validate.Struct(user)
	if errs != nil {

		u.l.Println(errs)
		http.Error(w, "Data is not correct", http.StatusBadRequest)
	}

	err = user.InsertUser(w)

	if err != nil {
		u.l.Println(err.Error())
		http.Error(w, "User was not inserted ", http.StatusBadRequest)
	}
}
