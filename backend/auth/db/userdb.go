package db

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/Shahriar-shudip/alocmedia/util"
	_ "github.com/lib/pq"
)

type User struct {
	Name     string `json:name`
	Email    string `json:email`
	Password string `json:password`
}

const (
	host     string = "localhost"
	port     int    = 5432
	user     string = "postgres"
	password string = "asd"
	dbname   string = "gopg"
)

func (u *User) FromJson(r io.Reader) error {
	decoder := json.NewDecoder(r)
	return decoder.Decode(u)
}

func (u *User) ToJson(w http.ResponseWriter) error {
	encoder := json.NewEncoder(w)
	return encoder.Encode(u)
}

func (u *User) InsertUser() error {
	db := util.GetConnection(util.Conn{host, port, user, password, dbname})
	query := `insert into userinfo (name,email,password) values ($1,$2,$3)`
	fmt.Println(u.Name)
	fmt.Println(u.Email)
	fmt.Println(u.Password)
	res, err := db.Exec(query, u.Name, u.Email, u.Password)
	fmt.Println(res)
	if err != nil {
		return err
	}
	fmt.Println(res)
	return nil
}
