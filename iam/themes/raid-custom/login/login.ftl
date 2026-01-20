<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=!messagesPerField.existsError('username','password'); section>
    <#if section = "header">
        <!-- Header card moved outside to template.ftl for navigation -->

    <#elseif section = "form">
        <!-- ARDC Info Card -->
        <div class="ardc-info-card">
            <p class="ardc-title pb-1">
                ${msg("org.header.title")}
                <span class="demo-badge">${msg("org.badge.text")}</span>
            </p>
            <p class="ardc-description pb-0">
                ${msg("org.description.prefix")}
                <a href="${msg("org.raid.url")}" target="_blank" class="ardc-link">${msg("org.raid.text")}</a>
                ${msg("org.description.suffix")}
            </p>
            <p class="ardc-description pb-1">
                ${msg("org.maintained.prefix")}
                <a href="${msg("org.url")}" target="_blank" class="ardc-link">${msg("org.name")}</a>${msg("org.maintained.suffix")}
            </p>
            <div class="ardc-links">
                <a href="${msg("org.privacy.url")}" class="ardc-footer-link">${msg("org.privacy.text")}</a>
                <a href="${msg("org.terms.url")}" class="ardc-footer-link">${msg("org.terms.text")}</a>
            </div>
        </div>

        <!-- Login Card -->
        <div class="login-card">
            <div class="help-icon-wrapper">
                <div class="help-icon" title="${msg("help.tooltip")}">?</div>
            </div>

            <p class="ardc-title pb-1">${msg("loginTitle")}</h2>
            <p class="ardc-description pb-0">${msg("loginInstruction")}</p>

            <#if social.providers??>
                <div class="idp-buttons">
                    <#list social.providers as p>
                        <a href="${p.loginUrl}"
                           class="idp-button idp-${p.alias}"
                           id="social-${p.alias}">
                            <span class="idp-icon">
                                <#if p.alias == "google">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                <#elseif p.alias == "aaf">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                    </svg>
                                <#elseif p.alias == "orcid">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10"/>
                                    </svg>
                                </#if>
                            </span>
                            <span class="idp-text">${p.displayName!}</span>
                        </a>
                    </#list>
                </div>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>