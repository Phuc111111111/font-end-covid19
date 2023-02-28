package com.covid.news.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ChatMessageDTO {

    private MessageType type;
    private String content;
    private Long conversationId;
    private Long userId;
    private String username;
    private String token;
    private LocalDateTime createdDate;
    @Getter
    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
