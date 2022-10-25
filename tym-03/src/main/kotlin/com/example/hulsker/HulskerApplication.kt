package com.example.hulsker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HulskerApplication

fun main(args: Array<String>) {
    val data = Data()
    data.GetData()

    runApplication<HulskerApplication>(*args);


}

