package main

import (
	"infomation/model"
	"log"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
)

// 发布一条信息
type Infomation struct {
	Content string `json:"content"`
	Price   string `json:"price"`
	Contact string `json:"contact"`
}

type OpResult struct {
	Result string `json:"result"`
}

//更新一条信息
type OpItem struct {
	MsgID  int `json:"msgid"`
	Status int `json:"status"`
}

func main() {

	model.SqliteInstance().Open("./info.db")

	app := iris.New()
	app.Logger().SetLevel("debug")
	//并将请求记录到终端。
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(Cors)

	common := app.Party("/")
	{
		common.Options("*", func(ctx iris.Context) {
			ctx.Next()
		})
	}

	//普通用户查询
	app.Get("/", func(ctx iris.Context) {

		data := model.SqliteInstance().QuerySelectUserData()
		ctx.JSON(&data)

	})

	//管理员查询
	app.Get("/check", func(ctx iris.Context) {

		id := ctx.URLParam("id")
		log.Println("id:", id)
		if id != "1473695" {

			return
		}

		data := model.SqliteInstance().QuerySelectPendingData()
		ctx.JSON(&data)

	})

	//提交一条数据
	app.Post("/", func(ctx iris.Context) {

		r := OpResult{}

		jdata := Infomation{}
		err := ctx.ReadJSON(&jdata)
		if nil != err {

			r.Result = "parse err"
			ctx.JSON(&r)
			return
		}

		log.Println("联系方式:", jdata.Contact)
		log.Println("价格:", jdata.Price)
		log.Println("内容:", jdata.Content)
		model.SqliteInstance().QueryInsertItem(jdata.Content, jdata.Price, jdata.Contact)
		r.Result = "ok"
		ctx.JSON(&r)
	})

	//更新一条数据
	app.Put("/check", func(ctx iris.Context) {

		r := OpResult{}
		opItem := OpItem{}

		err := ctx.ReadJSON(&opItem)
		if nil != err {

			r.Result = "parse err"
			ctx.JSON(&r)
			return
		}
		log.Println("put data:", opItem)

		if opItem.Status > 2 {
			opItem.Status = 2
		}

		model.SqliteInstance().QueryUpdateData(opItem.MsgID, opItem.Status)

		r.Result = "ok"
		ctx.JSON(&r)
	})

	app.Run(iris.Addr(":8111"))
}

//Cors 跨域
func Cors(ctx iris.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	if ctx.Request().Method == "OPTIONS" {
		ctx.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS")
		ctx.Header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization")
		ctx.StatusCode(204)
		return
	}
	ctx.Next()
}
