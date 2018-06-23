import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {

  state = {
    number:0,
    //DB 배열이니까 여기에 넣어주기 객체
    list : [],
    //data 보낼 준비
    send : ''
  }

// insert 하자마자 업데이트 handleClick 다음에 만듬
  getNumberList(){
    axios.get('http://localhost:4000/test')
    .then((response)=>{
      console.log(response.data);
      // this.setState({number : response.data.number});
      // 모든 객체 가지고 오기 -> state에 list 만들고 밑에처럼 써주면 됨
      this.setState({list : response.data.result});
      })

    .catch((error)=>{
      console.log(error);
    })
  }

  handleClick(){
    //통신을 한다 axios를 활용해서
    // axios.get('http://localhost:4000/test')
    // .then((response)=>{
    //   console.log(response.data);
    //   // this.setState({number : response.data.number});
    //   // 모든 객체 가지고 오기 -> state에 list 만들고 밑에처럼 써주면 됨
    //   this.setState({list : response.data.result});
    //   })
    //
    // .catch((error)=>{
    //   console.log(error);
    // })
    this.getNumberList();
  }

  handleChange(e){
    console.log(e.target.value)
      this.setState({ send : e.target.value});
  }

// 데이터를 백엔드에 보내준다/
// 입력시킨다. (POST)
  submitClick(){
    //클릭하는 순간 확인
    console.log(this.state.send);
    axios.post('http://localhost:4000/test',{ num : this.state.send })
    .then((response)=>{
      console.log(response.data)
      this.getNumberList();


    })
    .catch((error)=>{
      console.log(error)
    })
  }

  render() {

    const {list} = this.state;
    const numberList = list.map((value)=>{
      return <h2 key={value.id}>{value.number}</h2>
    })

    return (
      <div className="Test">
        <button onClick={this.handleClick.bind(this)}>통신하기</button>
        {/* <h2>{this.state.number}</h2> */}
        {/* 화면에 뿌려주려면 밑에다가 꼭꼭 써주기! */}
        <div>{numberList}</div>
        <input type="text" onChange={this.handleChange.bind(this)}/>
        <button onClick={this.submitClick.bind(this)}>입력하기</button>
      </div>
    );
  }
}

export default Test;


// 
