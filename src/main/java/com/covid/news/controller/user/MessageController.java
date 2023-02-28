package com.covid.news.controller.user;

import com.covid.news.model.ChatMessageDTO;
import com.covid.news.utils.RestUtils;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class MessageController {


	public MessageController(RestUtils restUtils) {
		this.restUtils = restUtils;
	}

	private RestUtils restUtils;


	@MessageMapping("/chat/{conversationId}")
	@SendTo("/topic/message/{conversationId}")
	public ChatMessageDTO greeting(ChatMessageDTO message, @DestinationVariable Long conversationId) throws Exception {
		restUtils.addMessage(message);
		message.setCreatedDate(LocalDateTime.now());
		return message;
	}


	@MessageMapping("/sendToUser/{sendToUserId}")
	@SendTo("/list-chat/message/{sendToUserId}")
	public Long sendToUser(@DestinationVariable Long sendToUserId) {
		return sendToUserId;
	}


}
