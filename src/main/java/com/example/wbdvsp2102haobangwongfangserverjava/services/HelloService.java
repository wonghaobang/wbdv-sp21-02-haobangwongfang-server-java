package com.example.wbdvsp2102haobangwongfangserverjava.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// what we wanna be able to do is to run this function from outside remotely
// wanna be able to map the function to the URL so if I hit the URL, something happens in the server,
// I can run code and logic on the server


@RestController
public class HelloService {

    @GetMapping("/hello")       // map this function to a http get
    public String SayHi() {
        return "Hello World!";
    }


    @GetMapping("/addAandB/{A}/{B}")
    public Integer add(@PathVariable("A") Integer a, @PathVariable("B") Integer b) {
        return a + b;
    }


    @GetMapping("/my/hello/object")
    public HelloObject getHelloObject() {
        HelloObject h = new HelloObject();
        h.setId(123);
        h.setName("My Hello Object");
        return h;
    }

}
