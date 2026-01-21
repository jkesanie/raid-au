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
            <p class="ardc-description pb-0 pt-1">
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
                <div class="help-icon" title="${msg("help.tooltip")}">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-306n9t"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HelpOutlineIcon" aria-label="You can sign in either directly with your personal Google or ORCID account, or via the AAF if your organisation has an agreement. Once you've signed in and authenticated yourself, you will be able to submit a request for a specific institution to authorize your usage of the RAiD app with their data."><path d="M11 18h2v-2h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4"></path></svg>
                </div>
            </div>

            <p class="ardc-title pb-0">${msg("loginTitle")}</h2>
            <p class="ardc-description pb-1">${msg("loginInstruction")}</p>

            <#if social.providers??>
                <div class="idp-buttons pt-0">
                    <#list social.providers as p>
                        <a href="${p.loginUrl}"
                           class="idp-button idp-${p.alias}"
                           id="social-${p.alias}">
                            <span class="idp-icon">
                                <#if p.alias == "google">
                                    <svg class=""
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-testid="GoogleIcon">
                                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,
                                            0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,
                                            1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,
                                            12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z">
                                        </path></svg>
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