import logoSrc from "~/assets/logo.png";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";

import { loginWithKakao } from "../utils/loginWihtKakao";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={className} {...props}>
      <form className="flex flex-col gap-8">
        {/* 로고 및 타이틀 */}
        <div className="flex flex-col items-center gap-2 text-center">
          <a href="#">
            <img src={logoSrc} alt="AI Hub Logo" className="size-12" />
          </a>
          <h1 className="text-2xl font-bold text-foreground">AI Hub</h1>
          <p className="text-sm text-foreground/85">
            AI Hub는 AI를 코인 기반 선불제로 통합 제공하는 플랫폼입니다.
          </p>
        </div>

        {/* 로그인 버튼 */}
        <Field>
          <Button
            className="w-full bg-[#fee500] hover:bg-[#ddc400]"
            size="lg"
            onClick={loginWithKakao}
          >
            <svg version="1.1" viewBox="0 0 99.618 92.147" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="a">
                  <path d="m0 595.28h841.89v-595.28h-841.89z" />
                </clipPath>
              </defs>
              <g transform="matrix(1 0 0 -1 -362.26 234.1)">
                <g clipPath="url(#a)">
                  <g transform="translate(163.26 376.68)">
                    <path
                      d="m248.81-143.58c-26.953 0-48.808-17.256-48.808-38.555 0-13.681 9.052-25.693 22.646-32.549l-4.599-17.167c-0.176-0.527-0.03-1.085 0.352-1.465 0.263-0.265 0.614-0.411 0.995-0.411 0.294 0 0.586 0.117 0.85 0.322l19.775 13.36c2.872-0.41 5.802-0.644 8.789-0.644 26.953 0 48.81 17.255 48.81 38.554 0 21.299-21.857 38.555-48.81 38.555"
                      fill="#3c1e1e"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <p className="text-black/85">카카오 로그인</p>
          </Button>
        </Field>
      </form>
    </div>
  );
}
