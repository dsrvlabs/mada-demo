import Cookies from "universal-cookie";

const cookies = new Cookies();

export interface CookieContext {
  req?: any;
  res?: any;
  useRootDomain?: boolean;
}

export const getCookie = (key: string, context: CookieContext) => {
  const { req, res } = context || {};

  // Server side
  if (req) {
    const setCookieHeader = res.getHeader("set-cookie");
    if (setCookieHeader) {
      const setCookieMap = setCookieHeader.map((cookie: string) => cookie.split(";")[0]);

      const cookie = setCookieMap.find((param: string) => param.startsWith(key));
      if (cookie) {
        return cookie.split("=")[1];
      }
    }
    return req.cookies[key];
  }

  // Client side
  if (typeof window !== "undefined") {
    return cookies.get(key);
  }

  // WTF you did something wrong
  return undefined;
};

export const setCookie = (key: string, value: string, expires: Date, context: CookieContext) => {
  const { req, res, useRootDomain } = context || {};
  const rootDomain = "localhost";

  // Update request cookies
  if (req) {
    req.cookies[key] = value;
  }

  // Server side
  if (res) {
    const setCookieHeader = res.getHeader("set-cookie");
    if (setCookieHeader) {
      const setCookieMap = setCookieHeader.map((cookie: string) => cookie.split(";")[0]);
      const cookieIndex = setCookieMap.findIndex((param: string) => param.startsWith(key));
      if (cookieIndex >= 0) {
        setCookieMap[cookieIndex] = `${key}=${value}`;
        res.setHeader("set-cookie", setCookieMap);
        return;
      }
    }

    if (useRootDomain) {
      res.setHeader("set-cookie", [
        ...(res.getHeader("set-cookie") || []),
        `${key}=${value}; path=/; samesite=lax; domain=${rootDomain}; expires=${expires.toUTCString()}`,
      ]);
    } else {
      res.setHeader("set-cookie", [
        ...(res.getHeader("set-cookie") || []),
        `${key}=${value}; path=/; samesite=lax; expires=${expires.toUTCString()}`,
      ]);
    }
  }

  // Client side
  if (typeof window !== "undefined") {
    if (value === "") {
      cookies.remove(key, {
        path: "/",
        domain: useRootDomain ? rootDomain : undefined,
      });
    } else {
      cookies.set(key, value, {
        expires,
        path: "/",
        domain: useRootDomain ? rootDomain : undefined,
      });
    }
  }
};

export const removeCookie = (key: string, context: CookieContext) => {
  setCookie(key, "", new Date(0), context);
  if (getCookie(key, { ...context, useRootDomain: true })) {
    setCookie(key, "", new Date(0), { ...context, useRootDomain: true });
  }
};

export const setSessionCookie = (key: string, value: string) => {
  cookies.set(key, value, { path: "/" });
};
