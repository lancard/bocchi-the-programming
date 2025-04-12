import { createToken, Lexer } from 'chevrotain';

// --------------------
// 1. LEXER 정의
// --------------------

// 함수 관련 토큰 (간단한 형태로 표현)
const FunctionKeyword = createToken({ name: "FunctionKeyword", pattern: /function/ });
const ReturnKeyword = createToken({ name: "ReturnKeyword", pattern: /return/ });

// 기본 토큰 정의
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ });
const NumberLiteral = createToken({ name: "NumberLiteral", pattern: /\d+/ });
const Plus = createToken({ name: "Plus", pattern: /\+/ });
const Assign = createToken({ name: "Assign", pattern: /=/ });
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

// 문자열 관련 토큰 (큰따옴표와 작은따옴표 모두 지원)
const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /(["'])(?:(?=(\\?))\2.)*?\1/ // 큰따옴표 또는 작은따옴표로 감싸진 문자열
});

// f-string 토큰
const FString = createToken({
  name: "FString",
  pattern: /f"([^"\\]*(\\.[^"\\]*)*)"/, // f-string 형태 (f"문자열")
});

// b-string 토큰
const BString = createToken({
  name: "BString",
  pattern: /b"([^"\\]*(\\.[^"\\]*)*)"/, // b-string 형태 (b"바이너리 데이터")
});

// 괄호와 기타 기호들
const LeftParenthesis = createToken({ name: "LeftParenthesis", pattern: /\(/ });
const RightParenthesis = createToken({ name: "RightParenthesis", pattern: /\)/ });
const LeftBrace = createToken({ name: "LeftBrace", pattern: /\{/ });
const RightBrace = createToken({ name: "RightBrace", pattern: /\}/ });

// 모든 토큰을 하나로 묶기
const allTokens = [
  WhiteSpace,
  FunctionKeyword,
  ReturnKeyword,
  Assign,
  Plus,
  NumberLiteral,
  Identifier,
  StringLiteral,
  FString,
  BString,
  LeftParenthesis,
  RightParenthesis,
  LeftBrace,
  RightBrace
];

// 렉서 생성
const MyLexer = new Lexer(allTokens);

// 텍스트를 렉서로 분석하는 함수 (예시)
function tokenize(inputText) {
  const lexingResult = MyLexer.tokenize(inputText);
  if (lexingResult.errors.length > 0) {
    console.log("Lexing errors detected:", lexingResult.errors);
  }
  return lexingResult.tokens;
}

// 예시 사용
const tokens = tokenize('function greet(name) { return "Hello, " + name; }');
console.log(tokens);