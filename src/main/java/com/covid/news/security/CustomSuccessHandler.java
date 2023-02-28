package com.covid.news.security;

import com.covid.news.constant.SystemConstant;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        String targetUrl = determineTargetUrl(authentication);
        if (response.isCommitted()) return;
        redirectStrategy.sendRedirect(request, response, targetUrl);
    }

    public String determineTargetUrl(Authentication authentication) {
        List<String> roles = SecurityUtils.getAuthorities();
        if (isAdmin(roles)) return SystemConstant.ADMIN_PAGE;
        else return SystemConstant.USER_PAGE;
    }

    public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
        this.redirectStrategy = redirectStrategy;
    }

    public RedirectStrategy getRedirectStrategy() {
        return redirectStrategy;
    }

    private boolean isAdmin(List<String> roles) {
        if (roles.contains(SystemConstant.ROLE_ADMIN)) return true;
        return false;
    }


}
