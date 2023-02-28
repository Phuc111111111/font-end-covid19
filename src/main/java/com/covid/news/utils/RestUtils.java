package com.covid.news.utils;

import com.covid.news.model.ChatMessageDTO;
import com.covid.news.model.MessageRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestUtils {

    public RestUtils(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Value("${zuul.routes.backend.url}")
    String url;

    private RestTemplate restTemplate;

    public void addMessage(ChatMessageDTO chatMessageDTO) {

        HttpHeaders headers = new HttpHeaders();
        MessageRequestDTO messageRequestDTO = MessageRequestDTO.builder().content(chatMessageDTO.getContent()).build();
        headers.set("Authorization", "Bearer "+chatMessageDTO.getToken());

        HttpEntity<MessageRequestDTO> entity = new HttpEntity<>(messageRequestDTO,headers);

        ResponseEntity<Void> response  = restTemplate.exchange(url+"/user/messages/"+chatMessageDTO.getConversationId(),
                HttpMethod.POST, entity, Void.class);
    }
}
