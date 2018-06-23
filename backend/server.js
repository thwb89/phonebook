const express = require('express');
const app = express();
const cors = require('cors')();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', //127.0.0.1
  port: '3306',
  user: 'root',
  password: 'frontend',
  database: 'phonebook'
});

connection.connect((err)=>{
  if (err) {
    console.log(err);
  }
  console.log('connection succeed')
});

//test
// connection.query('SELECT * FROM test', (err,rows)=>{
//   if (err){
//     console.log(err);
//   }
//   console.log(rows)
//   console.log(rows[0].number);//rows는 결과
// });

app.use(cors);

app.listen(4000,() => {
  console.log('4000 포트로 웹서버가 실행되었습니다.');
});

app.get('/test', (req,res) => {
  // res.json({ number : 10});
  // DB 쿼리를 통해 원하는 값을 보내준다.
  connection.query('SELECT * FROM test', (err,rows) => {
    if(err){
      console.log(err)
    }
    // res.json({ number : rows[0].number})
    res.json({result : rows});
  })
})

// DB INSERT DATA
app.post('/test', (req,res)=>{
  // console.log('a')
  //데이터는 body를 통해서 넘어온다
  console.log(req.body.num);

  // 디비에 insert를 사용해서 데이터를 넣는다.
//   connection.query('INSERT INTO test SET ?',
//   { number : req.body.num },
//   (err,rows)=>{
//     if(err){
//       console.log(err);
//     }
//     console.log(rows);
//   })
//
//   res.json({message : 'success'})
// })



connection.query('INSERT INTO test SET number="'+req.body.num+'" ',

  (err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log(rows);
    res.json({message : 'success'})
  });
})

// 클릭하면 지워지는 거 만들기
