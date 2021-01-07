package model

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type RecordItem struct {
	MsgID   int    `json:"msgid"`
	Content string `json:"content"`
	Price   string `json:"price"`
	Contact string `json:"contact"`
	Date    string `json:"date"`
}

type dBSqllite3 struct {
	db *sql.DB
}

var gdb *dBSqllite3

func init() {
	gdb = &dBSqllite3{}
}

//SqliteInstance ...
func SqliteInstance() *dBSqllite3 {

	return gdb
}

//Open 打开
func (d *dBSqllite3) Open(dbFile string) {

	var err error
	d.db, err = sql.Open("sqlite3", dbFile)
	if nil != err {
		panic("打开数据库失败!")
	}

	if err = d.initDB(); nil != err {
		log.Println("警告:初始化异常,err:", err)
		return
	}

}

func (d *dBSqllite3) initDB() error {
	sql := `
	CREATE TABLE IF NOT EXISTS information(
		MsgId 				INTEGER PRIMARY KEY  autoincrement,
		Content           	TEXT    	NOT NULL,
		Price            	TEXT     	NOT NULL,
		Contact        		TEXT 		NOT NULL,
		Date         		datetime 	default (datetime('now', 'localtime')),
		Status				INT			default 0
	 );`

	_, err := d.db.Exec(sql)

	return err
}

//查询用户所有数据
func (d *dBSqllite3) QuerySelectUserData() []RecordItem {

	rows, err := d.db.Query("SELECT * FROM information where Status=1 order by Date desc limit 0, 100")
	if nil != err {

		log.Println("QuerySelectUserData Query err:", err)
		return nil
	}

	rList := []RecordItem{}

	for rows.Next() {

		var item RecordItem
		var status int
		err = rows.Scan(&item.MsgID, &item.Content, &item.Price, &item.Contact, &item.Date, &status)
		if nil != err {

			log.Println("QuerySelectUserData Scan err:", err)
			return nil
		}

		rList = append(rList, item)
	}

	return rList
}

//查询待处理的所有数据
func (d *dBSqllite3) QuerySelectPendingData() []RecordItem {

	rows, err := d.db.Query("SELECT * FROM information where Status=0 ")
	if nil != err {

		log.Println("QuerySelectPendingData Query err:", err)
		return nil
	}

	rList := []RecordItem{}

	for rows.Next() {

		var item RecordItem
		var status int
		err = rows.Scan(&item.MsgID, &item.Content, &item.Price, &item.Contact, &item.Date, &status)
		if nil != err {

			log.Println("QuerySelectPendingData Scan err:", err)
			return nil
		}

		log.Println("item:", item)
		rList = append(rList, item)
	}

	return rList
}

//更新数据
func (d *dBSqllite3) QueryUpdateData(msgid int, status int) {

	stmt, err := d.db.Prepare("UPDATE information SET Status=? where MsgId=?")
	if nil != err {
		log.Println("QueryUpdateData sql err:", err)
		return
	}

	_, err = stmt.Exec(status, msgid)
	if nil != err {
		log.Println("QueryUpdateData sql exec err:", err)
		return
	}
}

//插入数据
func (d *dBSqllite3) QueryInsertItem(content string, price string, contact string) {

	stmt, err := d.db.Prepare("INSERT INTO information(Content, Price, Contact)  values(?, ?, ?)")
	if nil != err {
		log.Println("QueryInsertItem sql err:", err)
		return
	}

	_, err = stmt.Exec(content, price, contact)
	if nil != err {
		log.Println("QueryInsertItem sql exec err:", err)
		return
	}

}
