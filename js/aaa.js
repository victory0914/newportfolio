"use strict";
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
(() => {
    const contentBoxStyles = `
  /* Important - e.g. Webflow applies a box sizing that messes this up
   certain elements look particularly bad without thise
  */
  box-sizing: content-box;
`;
    const spinAnimationStyles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
`;
    const loadingStyles = `
  position: absolute;
  top: 50%;
  left: 50%;

  border: 6px solid #aaa;
  border-radius: 50%;
  border-top: 6px solid #fff;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Important - e.g. Webflow applies a box sizing that messes this up */
  box-sizing: content-box;
`;
    const getMobilePopupStyles = (embedType) => `
@media(max-width: 480px) {
  .fillout-embed-${embedType},
  .fillout-embed-dynamic-${embedType} {
    width: 100vw !important;
    height: 100vh !important;
  }

  .fillout-embed-${embedType} .fillout-embed-iframe-container,
  .fillout-embed-dynamic-${embedType} .fillout-embed-iframe-container {
    max-width: 100vw;
    transition: unset;

    /* we make the iframe container full width on small screens, but not
    full height, because we do want to leave room for the X icon (for us we
    don't want to overlay it on top of logos or back buttons) */
    width: 100% !important;

    /* we leave some wiggle room here (the icon is ~24px) */
    height: calc(100vh - 40px) !important;
    margin-top: 40px !important;
  }

  .fillout-embed-${embedType} .fillout-embed-iframe-container iframe,
  .fillout-embed-dynamic-${embedType} .fillout-embed-iframe-container iframe {
    border-radius: 0;
  }

  /* on small devices we position the X above the form, and no right padding */
  .fillout-embed-${embedType} .fillout-embed-${embedType}-close-icon,
  .fillout-embed-dynamic-${embedType} .fillout-embed-${embedType}-close-icon {
    color: #fff !important;

    position: absolute;
    top: -38px !important;
    right: 20px !important;
    left: unset !important;

    width: 24px;
    height: 24px;
    cursor: pointer;

    background: #171717;
    border-radius: 50%;
    padding: 6px 6px 6px 6px;

    ${contentBoxStyles}
  }

  .fillout-embed-slider .fillout-embed-iframe-container iframe {}
}
  `;
    const popupBackgroundStyles = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .65);
  transition: opacity .25s ease-in-out;
  z-index: 10000000000000;
  display: flex;
  justify-content: center;
`;
    const popupStyles = `
${spinAnimationStyles}

.noscroll {
  overflow: hidden;
}

.fillout-embed-popup {
  ${popupBackgroundStyles}

  align-items: center;
}

.fillout-embed-dynamic-popup {
 ${popupBackgroundStyles}

  align-items: flex-start;
}

.fillout-embed-popup .fillout-embed-iframe-container {
  position: relative;
  transition: opacity .25s ease-in-out;
  min-width: 360px;
  min-height: 360px
}

.fillout-embed-dynamic-popup .fillout-embed-iframe-container {
  position: relative;
  transition: opacity .25s ease-in-out;
  min-width: 360px;
  min-height: 360px;

  /* Symmetrical padding on top and bottom, fixed to prevent too much movement */
  margin-top: 40px;
  max-height: calc(100vh - 80px);
}

.fillout-embed-popup .fillout-embed-iframe-container iframe,
.fillout-embed-dynamic-popup .fillout-embed-iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  border-radius: 10px;
}

.fillout-embed-popup .fillout-embed-popup-close-icon,
.fillout-embed-dynamic-popup .fillout-embed-popup-close-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  text-align: center;
  cursor: pointer;
  transition: opacity .5s ease-in-out;
  text-decoration: none;
  color: #fff !important;
  top: -15px;
  right: -15px;
  background: #171717;
  border-radius: 50%;
  padding: 6px 6px 6px 6px;

  ${contentBoxStyles}
}

.fillout-embed-popup .fillout-embed-popup-close-icon:hover,
.fillout-embed-dynamic-popup .fillout-embed-popup-close-icon:hover {
  transform: scale(1.05);
}

.fillout-embed-popup .fillout-embed-loading,
.fillout-embed-dynamic-popup .fillout-embed-loading {
  ${loadingStyles}
}

${getMobilePopupStyles('popup')}
`;
    const sliderStyles = `
${spinAnimationStyles}

.noscroll {
  overflow: hidden;
}

.fillout-embed-slider {
  ${popupBackgroundStyles}
}

.fillout-embed-slider .fillout-embed-iframe-container {
  position: absolute;
  top: 0px;

  /* slides in from the right always at the moment, can add a feature for
  left transition later */
  transition: transform .35s ease-in-out;

  height: 100%;
  opacity: 1;
}

.fillout-embed-slider .fillout-embed-iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  border-radius: 0px;
}

.fillout-embed-slider .fillout-embed-slider-close-icon {
  /* for sliders, the close icon is a little tab with an "X" in it centered
  vertically on the edge of the slider (unless on mobile, where we copy
  the styling of popup) */
  position: absolute !important;
  width: 24px;
  height: 24px;
  text-align: center;
  cursor: pointer;
  transition: opacity .5s ease-in-out;
  text-decoration: none;
  color: #fff !important;

  top: 50%;
  background: #171717;

  padding: 20px 4px 20px 4px;

  ${contentBoxStyles}
}

.fillout-embed-slider .fillout-embed-slider-close-icon:hover {
  transform: scaleY(1.05);
}

.fillout-embed-slider .fillout-embed-loading {
  ${loadingStyles}
}

${getMobilePopupStyles('slider')}
`;
    const standardStyles = `
${spinAnimationStyles}

.fillout-embed-standard {
  /* This will take up the full size of whatever div you're inserting the
   * iframe into. That div will grow in size depending on how large theh
   * iframe is.*/
  width: 100%;
  height: 100%;
}

.fillout-embed-standard .fillout-embed-iframe-container {
  position: relative;
  transition: opacity .25s ease-in-out;
  width: 100%;
  height: 100%;
}

.fillout-embed-standard .fillout-embed-iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  border-radius: 10px;
}

.fillout-embed-standard .fillout-embed-loading {
  ${loadingStyles}
}
`;
    const XIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
`;
    if (typeof window === 'undefined')
        return;
    // as long as the window is valid (and not embedding in e.g. nextJS improperly
    // or something similar), we initialize:
    // - popups
    // - slide overs
    // - etc.
    // by adding onclick handlers for all of them corresponding to the button
    // or element that is supposed to open them up, and also creates the
    // elements, with opacity 0 set initially
    const generateEmbedId = () => {
        const min = 10000000000000;
        const max = 99999999999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return `${randomNumber}`;
    };
    const getParentUrl = () => {
        var _a;
        let parentUrl;
        if (typeof window === 'undefined') {
            return parentUrl;
        }
        try {
            // helps for capturing parent URL if we're in an iframe (sometimes)
            parentUrl = (_a = window.top) === null || _a === void 0 ? void 0 : _a.location.href;
        }
        catch (e) {
            parentUrl = window.location.href;
        }
        return parentUrl;
    };
    // fillout config
    const getConfig = (element) => {
        const sliderDirection = element.dataset.filloutSliderDirection === 'left' ? 'left' : 'right';
        const buttonSize = element.dataset.filloutButtonSize || 'medium';
        const buttonColor = element.dataset.filloutButtonColor || '#3b82f6';
        const popupSize = element.dataset.filloutPopupSize || 'large';
        const hexToRgb = (hex) => {
            // just in case someone passes in rgba() format, which we used to use in
            // the past in the snippet
            if (typeof hex !== 'string' ||
                !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
                return [59, 130, 246]; // default color values for '#3b82f6'
            }
            let bigint = parseInt(hex.slice(1), 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;
            return [r, g, b];
        };
        const getLuminance = (hexColor) => {
            let [r, g, b] = hexToRgb(hexColor);
            // Calculate relative luminance
            // sRGB formula
            const getComponent = (color) => {
                color /= 255;
                return color <= 0.03928
                    ? color / 12.92
                    : Math.pow((color + 0.055) / 1.055, 2.4);
            };
            r = getComponent(r);
            g = getComponent(g);
            b = getComponent(b);
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        // smartly compute this to be black or white depending on the button color
        const buttonTextColor = getLuminance(buttonColor) > 0.5 ? 'black' : 'white';
        return {
            initialized: element.dataset.filloutInitialized !== undefined,
            inheritParameters: element.dataset.filloutInheritParameters !== undefined,
            dynamicResize: element.dataset.filloutDynamicResize !== undefined,
            flowPublicIdentifier: element.dataset.filloutId,
            buttonText: element.dataset.filloutButtonText,
            buttonFloat: element.dataset.filloutButtonFloat,
            buttonColor,
            buttonSize,
            buttonTextColor,
            sliderDirection,
            domain: element.dataset.filloutDomain,
            popupSize,
            preview: element.dataset.filloutPreview !== undefined,
        };
    };
    const getSharedIframeSrc = (configDomain, flowPublicIdentifier, inheritParameters, target) => {
        let domain = 'https://embed.fillout.com';
        if (configDomain) {
            if (configDomain === 'localhost:3000') {
                domain = `http://${configDomain}`;
            }
            else {
                domain = `https://${configDomain}`;
            }
        }
        const formLink = `${domain}/t/${flowPublicIdentifier}`;
        const iframeSrc = new URL(formLink);
        // if we're passed the option to inherit search parameters, then we add
        // those here as well.
        if (inheritParameters) {
            const params = new URL(window.location.href).searchParams;
            for (const [key, value] of params.entries()) {
                iframeSrc.searchParams.append(key, value);
            }
        }
        // we convert data- attributes into URL parameters. we use the ones passed
        // directly to the embed as taking priority (since explicitly set)
        const DATA_PREFIX = 'data-';
        for (const attribute of target.attributes) {
            if (attribute.name.startsWith('data-') &&
                !attribute.name.startsWith('data-fillout')) {
                iframeSrc.searchParams.append(attribute.name.slice(DATA_PREFIX.length), attribute.value);
            }
        }
        return iframeSrc;
    };
    // make popup/slider button
    const initializePopupButton = (element, onclick) => {
        // leave previous button snippet as it is
        if (element.tagName !== 'DIV') {
            element.onclick = onclick;
            return;
        }
        const { buttonText, buttonColor, buttonTextColor, buttonFloat, buttonSize, } = getConfig(element);
        const button = document.createElement('button');
        button.innerText = buttonText || 'Open form';
        Object.assign(button.style, Object.assign(Object.assign({ cursor: 'pointer', fontFamily: 'Helvetica, Arial, sans-serif' }, (buttonSize === 'small'
            ? {
                padding: '8px 12px 8px 12px',
                fontSize: '16px',
                borderRadius: '28px',
            }
            : buttonSize === 'large'
                ? {
                    padding: '12px 14px 12px 14px',
                    fontSize: '20px',
                    borderRadius: '32px',
                }
                : {
                    padding: '10px 14px 10px 14px',
                    fontSize: '18px',
                    borderRadius: '32px',
                })), { display: 'inline-block', maxWidth: '100%', whitespace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textDecoration: 'none', color: buttonTextColor || '#ffffff', fontWeight: 'bold', textAlign: 'center', margin: '0', border: 'none' }));
        if (buttonFloat) {
            Object.assign(button.style, {
                'bottom-right': {
                    position: 'fixed',
                    bottom: '32px',
                    right: '32px',
                    zIndex: '9999999',
                },
                'bottom-left': {
                    position: 'fixed',
                    bottom: '32px',
                    left: '32px',
                    zIndex: '9999999',
                },
            }[buttonFloat]);
        }
        // dynamically add a hover effect depending on the button background color
        // but make sure to assign it without interfering with any other buttons
        // they mave have embedded on this page (assign unique id)
        const buttonId = generateEmbedId();
        const buttonClassName = `fillout-embed-popup-button-${buttonId}`;
        button.className = buttonClassName;
        const lighten = (color, amount) => {
            return ('#' +
                color
                    .replace(/^#/, '')
                    .replace(/../g, color => ('0' +
                    Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2)));
        };
        const style = document.createElement('style');
        style.textContent = `
      .${buttonClassName} {
        background-color: ${buttonColor};
        transition: background-color 0.2s ease;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      }

      .${buttonClassName}:hover {
        background-color: ${lighten(buttonColor, 10)};
      }
    `;
        document.head.appendChild(style);
        button.onclick = onclick;
        element.appendChild(button);
    };
    // Popups and sliders are quite similar in their setup, so we bundle in the
    // code together here and just adjust classes dependent on the embed type
    const initializePopupLikeTarget = (target, embedType) => {
        const { flowPublicIdentifier, initialized, inheritParameters, sliderDirection, domain, dynamicResize, popupSize, preview, } = getConfig(target);
        if (initialized)
            return;
        const popupContainer = document.createElement('div');
        popupContainer.className = dynamicResize
            ? `fillout-embed-dynamic-${embedType}`
            : `fillout-embed-${embedType}`;
        popupContainer.style.opacity = '0';
        const popupLoading = document.createElement('div');
        popupLoading.className = 'fillout-embed-loading';
        popupLoading.style.display = 'block';
        popupContainer.appendChild(popupLoading);
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'fillout-embed-iframe-container';
        iframeContainer.style.opacity = '1';
        popupContainer.appendChild(iframeContainer);
        const iframe = document.createElement('iframe');
        const iframeSrc = getSharedIframeSrc(domain, flowPublicIdentifier, inheritParameters, target);
        const embedId = generateEmbedId();
        iframeSrc.searchParams.append('fillout-embed-id', `${embedId}`);
        iframeSrc.searchParams.append('fillout-embed-type', embedType);
        if (preview) {
            iframeSrc.searchParams.append('fillout-embed-preview', 'yes');
        }
        const parentPage = getParentUrl();
        if (parentPage) {
            iframeSrc.searchParams.append('fillout-embed-parent-page', parentPage);
        }
        if (dynamicResize && embedType === 'popup') {
            iframeSrc.searchParams.append('fillout-embed-dynamic-resize', 'true');
            // transition for when the height changes (potentially)
            iframeContainer.style.transition = 'height 150ms ease';
            // listen for changes from the iframe, and upon changes, we resize the
            // target element here (based on height)
            const receiveMessage = (event) => {
                if ((!preview && event.origin !== new URL(iframeSrc.toString()).origin) ||
                    event.data.embedId !== embedId) {
                    // only for this iframe in question
                    return;
                }
                const newHeight = event.data.size;
                iframeContainer.style.height = `${newHeight
                    ? Math.min(newHeight + 48, window.innerHeight - 80)
                    : window.innerHeight - 80}px`;
            };
            window.addEventListener('message', receiveMessage, false);
        }
        iframe.src = iframeSrc.toString();
        iframe.allow = 'microphone; camera; geolocation';
        iframe.style.border = '0px';
        iframe.title = `${flowPublicIdentifier}`;
        const closeIcon = document.createElement('a');
        closeIcon.className = `fillout-embed-${embedType}-close-icon`;
        closeIcon.innerHTML = XIcon;
        // wait to display it until the iframe is loaded in
        closeIcon.style.opacity = '0';
        iframeContainer.appendChild(closeIcon);
        iframe.addEventListener('load', () => {
            if (popupLoading) {
                popupLoading.style.display = 'none';
            }
            if (closeIcon) {
                closeIcon.style.opacity = '1';
            }
            if (embedType === 'slider') {
                iframeContainer.style.transform = 'translateX(0)';
            }
        }, true);
        iframeContainer.appendChild(iframe);
        if (embedType === 'popup') {
            // later on, will offer this as variable sizing, which is why we compute
            // it on the fly here. default is not full width but slightly skinnier
            if (popupSize === 'medium') {
                // roughly the size at which scheduling pages work well, and we don't
                // run the risk of cutting anyone's form width short
                iframeContainer.style.width =
                    // 80vw of 1200 ~ 960px (we get progressively smaller with some padding
                    // on the RHS)
                    window.innerWidth < 1200 ? '80vw' : '1024px';
            }
            else if (popupSize === 'small') {
                // roughly inline with others we've seen, and smaller than this seems
                // a tad silly
                iframeContainer.style.width =
                    // 900 * 60vw ~= 540px
                    // 600 * 80vw ~= 480px (about as small as we want to get)
                    window.innerWidth < 600
                        ? '80vw'
                        : window.innerWidth < 900
                            ? '60vw'
                            : '560px';
            }
            else {
                iframeContainer.style.width = 'calc(100% - 160px)';
            }
            iframeContainer.style.height = 'calc(100% - 80px)';
        }
        else if (embedType === 'slider') {
            // later on will offer different sizing for this too maybe
            iframeContainer.style.width = '80vw';
            if (sliderDirection === 'left') {
                iframeContainer.style.left = '0px';
                iframeContainer.style.transform = 'translateX(-100%)';
                closeIcon.style.right = '-32px';
                closeIcon.style.borderTopRightRadius = '15px';
                closeIcon.style.borderBottomRightRadius = '15px';
            }
            else {
                iframeContainer.style.right = '0px';
                iframeContainer.style.transform = 'translateX(100%)';
                closeIcon.style.left = '-32px';
                closeIcon.style.borderTopLeftRadius = '15px';
                closeIcon.style.borderBottomLeftRadius = '15px';
            }
        }
        // close handlers
        const closePopup = () => {
            document.body.classList.remove('noscroll');
            if (embedType === 'popup') {
                popupContainer.style.opacity = '0';
            }
            else if (embedType === 'slider') {
                if (sliderDirection === 'left') {
                    iframeContainer.style.transform = 'translateX(-100%)';
                }
                else {
                    iframeContainer.style.transform = 'translateX(100%)';
                }
            }
            // more time needed to slide away for slider
            const timeout = embedType === 'popup' ? 250 : 350;
            setTimeout(() => {
                // before removing it, reset the styles for everything so that they
                // work nicely out of the box when it comes back up (since we're
                // reusing the same container
                popupLoading.style.display = 'block';
                closeIcon.style.opacity = '0';
                popupContainer.remove();
                // we give enough time for the opacity animation to finish
            }, timeout);
        };
        // onclick here, we also close the container (either the X or clicking
        // outside is fine).
        popupContainer.onclick = () => {
            closePopup();
        };
        closeIcon.onclick = () => {
            closePopup();
        };
        initializePopupButton(target, () => {
            document.body.appendChild(popupContainer);
            document.body.classList.add('noscroll');
            popupContainer.style.opacity = '1';
        });
        target.setAttribute('data-fillout-initialized', 'true');
    };
    const initializeStandardTarget = (target, isFullScreen) => {
        const { initialized, flowPublicIdentifier, inheritParameters, dynamicResize, domain, preview, } = getConfig(target);
        if (initialized)
            return;
        const standardContainer = document.createElement('div');
        standardContainer.className = 'fillout-embed-standard';
        standardContainer.style.opacity = '0';
        const standardLoading = document.createElement('div');
        standardLoading.className = 'fillout-embed-loading';
        standardLoading.style.display = 'block';
        standardContainer.appendChild(standardLoading);
        // relative while we show loading icon
        target.style.position = 'relative';
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'fillout-embed-iframe-container';
        iframeContainer.style.opacity = '1';
        standardContainer.appendChild(iframeContainer);
        const iframe = document.createElement('iframe');
        const iframeSrc = getSharedIframeSrc(domain, flowPublicIdentifier, inheritParameters, target);
        const embedId = generateEmbedId();
        iframeSrc.searchParams.append('fillout-embed-id', `${embedId}`);
        const embedType = isFullScreen ? 'fullscreen' : 'standard';
        iframeSrc.searchParams.append('fillout-embed-type', embedType);
        if (preview) {
            iframeSrc.searchParams.append('fillout-embed-preview', 'yes');
        }
        const parentPage = getParentUrl();
        if (parentPage) {
            iframeSrc.searchParams.append('fillout-embed-parent-page', parentPage);
        }
        if (dynamicResize) {
            iframeSrc.searchParams.append('fillout-embed-dynamic-resize', 'true');
            // transition for when the height changes (potentially)
            target.style.transition = 'height 150ms ease';
            // listen for changes from the iframe, and upon changes, we resize the
            // target element here (based on height)
            const receiveMessage = (event) => {
                if ((!preview && event.origin !== new URL(iframeSrc.toString()).origin) ||
                    event.data.embedId !== embedId) {
                    // only for this iframe in question
                    return;
                }
                if (event.data.type === 'form_resized') {
                    const newHeight = event.data.size;
                    target.style.height = `${newHeight}px`;
                }
                if (event.data.type === 'check_scroll_up') {
                    const elementTopInParent = iframe.getBoundingClientRect().top;
                    // Scroll only if the top of the iframe is out of view
                    if (elementTopInParent < 0) {
                        iframe.scrollIntoView({ behavior: 'auto' });
                    }
                }
            };
            window.addEventListener('message', receiveMessage, false);
        }
        iframe.src = iframeSrc.toString();
        iframe.allow = 'microphone; camera; geolocation';
        iframe.style.border = '0px';
        if (isFullScreen) {
            iframe.style.borderRadius = '0px';
        }
        iframe.title = `${flowPublicIdentifier}`;
        iframe.addEventListener('load', () => {
            if (standardLoading) {
                standardLoading.style.display = 'none';
            }
        }, true);
        iframeContainer.appendChild(iframe);
        target.appendChild(standardContainer);
        standardContainer.style.opacity = '1';
        // so that any other script imports don't accidentally try initializing
        // this again
        target.setAttribute('data-fillout-initialized', 'true');
    };
    // @ts-ignore
    const popupsInitialized = window.__filloutPopupsInitialized;
    const popupTargets = document.querySelectorAll("[data-fillout-embed-type='popup']");
    if (popupTargets.length > 0) {
        if (!popupsInitialized) {
            // add the popup stylesheet
            const popupStylesheet = document.createElement('style');
            popupStylesheet.innerHTML = popupStyles;
            document.head.appendChild(popupStylesheet);
            // @ts-ignore
            window.__filloutPopupEmbedsInitialized = true;
        }
        popupTargets.forEach(target => {
            if (target instanceof HTMLElement) {
                initializePopupLikeTarget(target, 'popup');
            }
        });
    }
    // @ts-ignore
    const slidersInitialized = window.__filloutSlidersInitialized;
    const sliderTargets = document.querySelectorAll("[data-fillout-embed-type='slider']");
    if (sliderTargets.length > 0) {
        if (!slidersInitialized) {
            const sliderStylesheet = document.createElement('style');
            sliderStylesheet.innerHTML = sliderStyles;
            document.head.appendChild(sliderStylesheet);
            // @ts-ignore
            window.__filloutSlidersInitialized = true;
        }
        sliderTargets.forEach(target => {
            if (target instanceof HTMLElement) {
                initializePopupLikeTarget(target, 'slider');
            }
        });
    }
    // @ts-ignore
    const standardInitialized = window.__filloutStandardInitialized;
    const standardTargets = document.querySelectorAll("[data-fillout-embed-type='standard']");
    if (standardTargets.length > 0) {
        if (!standardInitialized) {
            const standardStylesheet = document.createElement('style');
            standardStylesheet.innerHTML = standardStyles;
            // TODO mobile styles?
            document.head.appendChild(standardStylesheet);
            // @ts-ignore
            window.__filloutStandardInitialized = true;
        }
        standardTargets.forEach(target => {
            if (target instanceof HTMLElement) {
                initializeStandardTarget(target);
            }
        });
    }
    // @ts-ignore
    const fullScreenInitialized = window.__filloutFullScreenInitialized;
    const fullScreenTargets = document.querySelectorAll("[data-fillout-embed-type='fullscreen']");
    if (fullScreenTargets.length > 0) {
        // pretty much everything is the same as the standard embed
        if (!fullScreenInitialized) {
            // only need to add styles once
            const standardStylesheet = document.createElement('style');
            standardStylesheet.innerHTML = standardStyles;
            // TODO mobile styles?
            document.head.appendChild(standardStylesheet);
            // @ts-ignore
            window.__filloutFullScreenInitialized = true;
        }
        fullScreenTargets.forEach(target => {
            if (target instanceof HTMLElement) {
                initializeStandardTarget(target, true);
            }
        });
    }
})();
//# sourceMappingURL=embed.js.map