package data

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/Shahriar-shudip/golang-microservies-tuitorial/product-api/util"
	"github.com/rs/xid"
)

const (
	host     string = "localhost"
	port     int    = 5432
	user     string = "postgres"
	password string = "asd"
	dbname   string = "gopg"
)

type Product struct {
	Id         string          `json:"-"`
	Title      string          `json:"title"`
	Decription string          `json:"description"`
	Price      float32         `json:"price"`
	UserId     string          `json:"userId"`
	Store_name string          `json:"store_name"`
	Location   string          `json:"location"`
	Thumbnail  string          `json:thumbnail`
	Images     json.RawMessage `json:"images"`
	Catagory   string          `json:"catagory"`
}

func (p *Product) FromJson(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(p)
}
func (p *Product) AddProduct() {
	db := util.GetConnection(util.Conn{host, port, user, password, dbname})
	p.Id = generateId()
	ImagesStr := string(p.Images)
	fmt.Println(ImagesStr)
	query := `insert into products 
	(product_id,  product_title ,product_desc,product_price,user_id,store_name,location,thumbnail ,images,catagory)
	values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
	res, _ := db.Query(query, p.Id, p.Title, p.Decription, p.Price, p.UserId, p.Store_name, p.Location, p.Thumbnail, ImagesStr, p.Catagory)
	fmt.Println(res)
}

type Products []*Product

func (p *Products) FromJson(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(p)
}

func (p *Products) ToJson(w io.Writer) error {
	encoder := json.NewEncoder(w)
	return encoder.Encode(p)
}

func generateId() string {
	guid := xid.New()
	return guid.String()
}
