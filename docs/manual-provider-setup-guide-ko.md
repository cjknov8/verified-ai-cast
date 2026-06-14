# 외부 계정·계약 수동 처리 가이드

작성일: 2026-06-14  
대상: Verified AI Cast 대표자 또는 운영 책임자

이 문서는 사람이 직접 가입, 본인 확인, 사업자 심사, 계약 또는 법률 검토를 해야 하는
작업만 모은 것입니다. 비밀키는 메신저, 이슈, Git, 문서에 붙여 넣지 말고 Vercel의
암호화된 Environment Variables에 직접 입력합니다.

## 0. 먼저 확정할 것

1. 파일럿 출시 법인과 국가를 확정합니다. 현재 기본값은 `LAUNCH_MARKET=KR`입니다.
2. 회사 도메인 이메일을 준비합니다: `security@`, `privacy@`, `support@`, `billing@`.
3. 판매자는 초대제로 운영하고 승인 담당자 한 명과 대체 담당자 한 명을 지정합니다.
4. PG 승인이 끝나기 전에는 테스트 결제 또는 세금계산서·수동 인보이스만 사용합니다.

## 1. Google 로그인과 Supabase

### Supabase에서 할 일

1. [Supabase](https://supabase.com/)에서 회사 소유 계정으로 프로젝트를 만듭니다.
2. 한국 파일럿이면 사용 가능한 가장 가까운 리전을 선택합니다.
3. SQL Editor에서 다음 마이그레이션을 파일명 순서대로 적용합니다.
   - `202606020001_initial_schema.sql`
   - `202606140001_commercial_registry.sql`
   - `202606140002_secure_asset_vault.sql`
4. Authentication > URL Configuration에 아래를 등록합니다.
   - Site URL: 실제 운영 도메인
   - Redirect URL: `https://실제도메인/auth/callback`
   - Preview 테스트가 필요하면 Vercel Preview URL 패턴을 별도로 제한해 등록합니다.
5. Authentication > Providers > Google을 나중 단계에서 받은 Client ID/Secret으로 켭니다.
6. Project Settings > API에서 아래 값을 Vercel에 입력합니다.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Production/Preview 서버 환경에만, 브라우저 노출 금지)

### Google Cloud Console에서 할 일

1. [Google Auth Platform](https://console.cloud.google.com/auth/overview)에서 회사 소유 프로젝트를 만듭니다.
2. OAuth consent screen의 앱 이름, 지원 이메일, 개인정보처리방침 URL, 이용약관 URL,
   승인 도메인을 입력합니다.
3. OAuth Client ID를 Web application 유형으로 생성합니다.
4. Supabase Google Provider 화면에 표시되는 callback URL을 Authorized redirect URI로
   정확히 등록합니다. 일반적으로 앱의 `/auth/callback` URL과는 다른 Supabase URL입니다.
5. Client ID와 Client Secret을 Supabase Google Provider에 입력합니다.
6. 테스트 사용자 두 명으로 로그인, 로그아웃, 세션 만료, 권한 없는 내부 URL 리디렉션을
   검증합니다.

### 운영 승인 체크

- Google 계정 이메일만 보고 판매자 권한을 자동 부여하지 않습니다.
- Supabase `profiles`와 조직 멤버십을 운영자가 승인한 뒤 역할을 부여합니다.
- 직원 퇴사, 에이전시 계약 종료, 계정 탈취 신고 시 즉시 세션과 역할을 회수합니다.
- 설정과 RLS 테스트가 끝난 뒤에만 `AUTH_ENFORCEMENT_ENABLED=true`로 바꿉니다.

## 2. Cloudflare R2 비공개 저장소

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)에서 회사 소유 계정을 만듭니다.
2. R2에서 `verified-ai-cast-assets` 같은 전용 버킷을 생성합니다.
3. Public Development URL과 custom public domain을 켜지 않습니다.
4. Object Read & Write 권한을 해당 버킷 하나에만 가진 API token을 생성합니다.
5. 다음 값을 Vercel에 입력합니다.
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `STORAGE_UPLOAD_MAX_BYTES=536870912` (파일럿 512 MiB)
6. R2 CORS는 운영 도메인과 필요한 Preview 도메인만 허용합니다.
   - Methods: `PUT`, `HEAD`
   - Headers: `Content-Type`, `x-amz-meta-*`
   - Origins: 실제 HTTPS 도메인만
7. 별도 비운영 버킷으로 업로드 URL 만료, 다른 계정 object key 접근 거부, 허용되지 않은
   MIME, 최대 크기, 변조된 SHA-256, 삭제·보존 절차를 테스트합니다.
8. 테스트 완료 뒤에만 `PRIVATE_STORAGE_ENABLED=true`로 바꿉니다.

사람이 결정해야 할 보존 정책:

- 계약 전 원본과 거절된 파일의 삭제 시점
- 활성 라이선스 자료의 최소 보존 기간
- 분쟁·소송 보존 명령 시 삭제 중지 절차
- 계정 폐쇄 후 메타데이터와 원본의 보존 차이
- 침해 신고 시 격리 권한과 재심 절차

## 3. 한국 결제: PortOne V2 + Toss Payments

PortOne은 결제 연동 계층이고 Toss Payments는 실제 PG 채널입니다. 양쪽 가입만으로
자동 승인되는 것이 아니며 업종, 상품, 환불, 정산 흐름에 대한 심사가 필요합니다.

### 준비 서류

- 사업자등록증, 법인등기 및 대표자 확인 자료
- 법인 명의 정산 계좌 사본
- 운영 도메인, 이용약관, 개인정보처리방침, 환불·취소 정책
- 판매 상품과 서비스 흐름 설명
- 고객지원 연락처와 분쟁 처리 절차
- 에셋 권리 검증 절차와 불법·침해 콘텐츠 대응 정책
- 구매자 결제와 판매자 지급이 분리된 정산 흐름도

### 진행 순서

1. [PortOne](https://portone.io/korea/ko) 사업자 계정을 개설하고 V2 콘솔을 사용합니다.
2. Toss Payments PG 계약·심사를 신청합니다.
3. “디지털 에셋/라이선스 중개”, 해외 거래 가능성, 환불 시점, 검수 후 확정 구조,
   판매자 지급 시점을 숨기지 말고 서면으로 설명합니다.
4. 에스크로 또는 지급대행이 필요한지 PortOne과 Toss에 서면으로 확인합니다. 일반
   카드 결제를 임의로 에스크로처럼 표현하지 않습니다.
5. 테스트 채널을 연결하고 아래 값을 Vercel Preview에 먼저 입력합니다.
   - `NEXT_PUBLIC_PORTONE_STORE_ID`
   - `PORTONE_API_SECRET`
   - `PORTONE_TOSS_CHANNEL_KEY`
6. 성공, 실패, 사용자 취소, 중복 콜백, 금액 불일치, 부분 환불, 전체 환불, 지급 보류를
   테스트합니다.
7. 웹훅 서명 검증과 주문 금액 서버 재검증이 구현·통과한 뒤 Production 키로 교체합니다.
8. 실제 소액 결제와 환불을 회계 담당자와 대조한 뒤 `PAYMENTS_KR_ENABLED=true`로 설정합니다.

계약 전 확인 질문:

- 본 서비스 업종의 허용 여부와 금지 품목
- 해외 발행 카드, 다중 통화, 해외 구매자 지원 범위
- 승인 취소·부분 환불 가능 기간과 수수료
- 판매자 다수에게 지급할 때 필요한 별도 라이선스 또는 계약
- 지급 보류, 차지백, 준비금, 부정거래 책임
- 현금영수증, 부가세, 세금계산서 책임 주체

## 4. 글로벌 결제: Stripe

1. [Stripe 지원 국가 목록](https://stripe.com/global)에서 **운영 법인의 설립 국가**를 확인합니다.
2. 한국 법인만 있고 한국이 지원 목록에 없다면 우회 주소나 타인 계정을 사용하지 않습니다.
3. 지원 국가 법인이 실제로 운영될 때 법인 서류, 실소유자, 대표자, 현지 은행 계좌,
   세금 정보를 제출합니다.
4. Stripe Checkout과 webhook 테스트를 완료한 뒤 다음 값을 Vercel에 입력합니다.
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
5. 글로벌 시장이 실제 출시 범위일 때만 `LAUNCH_MARKET=GLOBAL` 또는 `DUAL`,
   `PAYMENTS_GLOBAL_ENABLED=true`를 설정합니다.

지원 법인이 생기기 전 글로벌 거래는 카드 결제 버튼을 열지 말고 계약서와 인보이스를
통한 수동 B2B 거래로 제한합니다.

## 5. 법률·신뢰 운영

외부 변호사에게 다음 문서를 한 번에 전달해 검토받습니다.

- 이용약관, 개인정보처리방침, 쿠키/추적 정책
- 판매자 약관, 구매자 약관, 라이선스 표준계약
- 정품/진품/브랜드 인증 표현 기준
- 인증서 효력, 만료, 철회, 오류 정정 정책
- 환불, 차지백, 분쟁, 이의신청 절차
- 초상권·퍼블리시티권·상표권·저작권 침해 신고 절차
- 국가별 준거법, 관할, 소비자 보호, 개인정보 국외 이전
- 구매대금 보관과 판매자 지급 구조의 인허가 검토

승인된 최종본이 배포된 뒤에만 `LEGAL_LAUNCH_APPROVED=true`로 바꿉니다.

## 6. Vercel 최종 입력과 검증

1. Production과 Preview 환경을 분리합니다. 테스트 키를 Production에 넣지 않습니다.
2. `NEXT_PUBLIC_*`만 브라우저에 노출된다는 전제로 검토합니다. 그 외 키는 서버 전용입니다.
3. 모든 값 입력 후 새 배포를 실행합니다.
4. `/api/provider-readiness`에 비밀값이 노출되지 않고 configured 상태만 보이는지 확인합니다.
5. `/launch-readiness`의 각 게이트가 실제 테스트 결과와 일치하는지 확인합니다.
6. `/login`, 내부 URL 리디렉션, 업로드/확정 API, 결제 성공·실패·환불 웹훅을 검증합니다.
7. 운영 URL, Supabase 로그, Cloudflare R2 감사 정보, 결제 콘솔 주문을 동일 시각 기준으로
   대조하고 출시 승인 기록을 남깁니다.

## 운영자 전달 완료 조건

운영자가 개발팀에 전달할 수 있는 비밀이 아닌 정보:

- 확정 출시 국가와 법인명
- 운영 도메인
- Supabase project ref
- R2 버킷명
- PortOne Store ID와 채널의 테스트/운영 구분
- PG 계약 상태와 허용된 상품/국가/통화
- Stripe 계정 국가와 activation 상태
- 법률 문서 승인일과 승인자

API secret, service role key, OAuth secret은 전달하지 말고 Vercel에 직접 입력합니다.
