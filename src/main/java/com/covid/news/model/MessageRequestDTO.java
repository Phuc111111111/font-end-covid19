package com.covid.news.model;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class MessageRequestDTO {

    private String content;
}
