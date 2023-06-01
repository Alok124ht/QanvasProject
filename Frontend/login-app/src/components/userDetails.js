// import { Component } from "react";
import React ,{Component} from "react";

export default class userDetails extends Component{
    componentDidMount(){
        fetch("http://localhost:7000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              token:window.localStorage.getItem("token"),
            }),
          })

          .then((res)=> res.json())
          .then((data)=>{
            console.log(data, "userData");
          })
}
render(){
    return (
        <div>
            Name<h1>fname</h1>
            Email<h1>email</h1>
        </div>
    )
}
}