import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  text-align: center;
  color: #fff;
}

.main-submit-wrapper {
}

.wrapper-submit {
  padding: 2rem;
  display: inline-block;
  float: none;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: -50px;
}

.wrapper-submit label {
  float: left;
  margin-bottom: 10px;
}

.wrapper-submit input,
.wrapper-submit select,
.notice {
  width: 100%;
  color: #fff;
  font-size: 10px;
}

.notice {
  border: 1px solid #5f6368;
  background-color: rgba(255, 255, 255, 0.04);
  margin-bottom: 20px;
  text-align: left;
  padding: 1rem;
  border-radius: 4px;
}

.notice h2 {
  font-weight: 400;
}

.wrapper-submit input {
  font-weight: 400;
  font-size: 0.9rem;
  font-family: "Inter";
  border-radius: 4px;
}

.wrapper-submit input {
  float: left;
  padding: 0 1.25rem;
  margin: 0 0 1.25rem;
  line-height: 54px;
  background: transparent;
  border: 2px solid #fff;
  outline: none;
  -webkit-appearance: none;
}

table,
td,
th {
  border: 1px solid #666;
}

.wrapper-submit textarea:focus,
.wrapper-submit textarea:active {
  border-color: #fff;
}
.wrapper-submit input[type="submit"] {
  float: left;
  cursor: pointer;
  margin: 0;
  border: none;
  font-weight: bold;
  width: 100%;
  background: #000;
}
.wrapper-submit input[type="submit"]:hover,
.wrapper-submit input[type="submit"]:focus {
  opacity: 0.7;
}

input::placeholder {
  color: lightgray;
}

.submit-repo {
  width: 100%;
  height: 50px;
  font-family: "Inter";
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid #5f6368;
}

.submit-repo:hover {
  border: 2px solid #fff;
}

.submitted-label {
  text-align: left;
}

.repos {
  max-width: 960px;
  margin-top: 20px;
}

.repo {
  width: 352.5px;
  /* height: 200px; */
}

@media (max-width: 550px) {
  .repo {
    width: 320px;
  }
}

button {
  cursor: pointer;
}

::-webkit-scrollbar {
  background: transparent;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
`;