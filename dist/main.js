/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/game-input.tsx":
/*!***********************************!*\
  !*** ./components/game-input.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const react_1 = __webpack_require__(/*! react */ "react");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./lib/lang.ts");
const inp = __webpack_require__(/*! ../lib/keyboard */ "./lib/keyboard.ts");
const game_symbol_1 = __webpack_require__(/*! ./game-symbol */ "./components/game-symbol.tsx");
class GameInput extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { className: 'game-view', text: lang_1.default.get(props.text) || props.text, input: '' };
    }
    componentDidMount() {
        let { oninput, text, limit } = this.props;
        inp.subscribe((e) => {
            let { input } = this.state;
            if (e === 'Enter') {
                let key = e;
                this.setState({ text: lang_1.default.get('good') });
                inp.subscribe(null);
                setTimeout(() => {
                    this.setState({ className: 'game-view drop' });
                    window.addEventListener('animationend', function v(e) {
                        if (e.target !== this.refs['input'])
                            return;
                        window.removeEventListener('animationend', v);
                        oninput(input);
                    }.bind(this));
                }, 800);
            }
            if (e === 'Backspace')
                this.setState({ input: input.substr(0, input.length - 1) });
            if (e.length !== 1 || e === ' ')
                return;
            if (input.length < limit)
                this.setState({ input: input + e });
        });
    }
    drop() {
    }
    render() {
        let { className, text, input } = this.state;
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: 'game-middle' },
                React.createElement("div", { key: text, className: 'game-text' }, lang_1.default.get(text) || text),
                React.createElement("div", { className: 'game-input', ref: 'input' }, (input || ' ').split('').map((e, i) => (React.createElement(game_symbol_1.default, { className: '', key: `var${e}${i}`, symbol: e })))))));
    }
}
exports.default = GameInput;


/***/ }),

/***/ "./components/game-play.tsx":
/*!**********************************!*\
  !*** ./components/game-play.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const react_1 = __webpack_require__(/*! react */ "react");
const wodrs_1 = __webpack_require__(/*! ../lib/wodrs */ "./lib/wodrs.ts");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./lib/lang.ts");
const inp = __webpack_require__(/*! ../lib/keyboard */ "./lib/keyboard.ts");
const game_symbol_1 = __webpack_require__(/*! ./game-symbol */ "./components/game-symbol.tsx");
class GamePlay extends react_1.Component {
    constructor(props) {
        super(props);
        let { score, level, attempts, name, time } = props.state;
        this.state = {
            className: 'game-view',
            text: '',
            input: '',
            limit: 0,
            word: '',
            score: score,
            level: level,
            attempts: attempts,
            exit: false,
            time: time > 0 ? time : 30000,
            name: name,
            fail: false
        };
    }
    setWord(word) {
        word = word.trim();
        this.setState({ text: lang_1.default.get('word', word), limit: word.length, word: word });
    }
    componentDidMount() {
        let { oninput } = this.props;
        this.setWord(wodrs_1.default.get());
        let int = () => {
            let { time, attempts } = this.state;
            this.setState({ time: time - 10 });
            if (time < 0) {
                time = 0;
                clearInterval(interval);
                this.setState({ fail: true, className: 'game-view fail' });
                inp.subscribe(null);
                window.addEventListener('animationend', function v(e) {
                    if (e.target !== this.refs['input'])
                        return;
                    window.removeEventListener('animationend', v);
                    setTimeout(() => {
                        this.drop();
                        oninput(this.state);
                    }, 1000);
                }.bind(this));
            }
        };
        let interval = setInterval(int, 10);
        let oninp = (e) => {
            let { input, limit, word, time, score } = this.state;
            if (e.length === 1 && e !== ' ' && input.length < limit)
                input = input + e;
            this.setState({ input: input });
            input.split('').map((e, i) => {
                if (e !== word[i])
                    this.setState({ time: 0 });
            });
            if (input == word) {
                clearInterval(interval);
                inp.subscribe(null);
                this.setState({ time: time + word.length * 800, className: 'game-view success', score: score + word.length * 1 });
                window.addEventListener('animationend', function v(e) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (e.target !== this.refs['input'])
                            return;
                        window.removeEventListener('animationend', v);
                        setTimeout(() => {
                            this.drop();
                            oninput(this.state);
                        }, 1000);
                    });
                }.bind(this));
            }
        };
        inp.subscribe(oninp);
    }
    drop() {
        let { oninput } = this.props;
        this.setState({ className: 'game-view drop' });
        window.addEventListener('animationend', function v(e) {
            if (e.target !== this.refs['input'])
                return;
            window.removeEventListener('animationend', v);
            oninput(this.state);
        }.bind(this));
    }
    render() {
        let { className, text, input, name, score, level, attempts, time } = this.state;
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: 'game-header' },
                React.createElement("p", null,
                    lang_1.default.get('name'),
                    ": ",
                    React.createElement("b", { ref: "name" }, name)),
                React.createElement("p", null,
                    lang_1.default.get('score'),
                    ": ",
                    React.createElement("b", { ref: "score" }, score)),
                React.createElement("p", null,
                    lang_1.default.get('level'),
                    ": ",
                    React.createElement("b", { ref: "level" }, level)),
                React.createElement("p", null,
                    lang_1.default.get('attempts'),
                    ": ",
                    React.createElement("b", { ref: "attempts" }, attempts)),
                React.createElement("p", null,
                    lang_1.default.get('time'),
                    ": ",
                    React.createElement("b", { ref: "time" }, ((time > 0 ? time : 0) / 1000).toFixed(2)))),
            React.createElement("div", { className: 'game-middle' },
                React.createElement("div", { key: text, className: 'game-text' }, lang_1.default.get(text) || text),
                React.createElement("div", { className: 'game-input', ref: 'input' }, (input || ' ').split('').map((e, i) => (React.createElement(game_symbol_1.default, { className: '', key: `var${e}${i}`, symbol: e })))))));
    }
}
exports.default = GamePlay;


/***/ }),

/***/ "./components/game-quest.tsx":
/*!***********************************!*\
  !*** ./components/game-quest.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const react_1 = __webpack_require__(/*! react */ "react");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./lib/lang.ts");
const input = __webpack_require__(/*! ../lib/keyboard */ "./lib/keyboard.ts");
const game_symbol_1 = __webpack_require__(/*! ./game-symbol */ "./components/game-symbol.tsx");
class GameQuest extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { className: 'game-view', select: '', text: lang_1.default.get(props.text) };
    }
    componentDidMount() {
        let { vars, oninput, text } = this.props;
        input.subscribe((e) => {
            if (vars.indexOf(e) === -1)
                return;
            let key = e;
            if (text === 'select_lang')
                lang_1.default.lang = e;
            this.setState({ text: lang_1.default.get('good'), select: key });
            input.subscribe(null);
            setTimeout(() => {
                this.setState({ className: 'game-view drop' });
                window.addEventListener('animationend', function v(e) {
                    if (e.target !== this.refs['input'])
                        return;
                    window.removeEventListener('animationend', v);
                    oninput(key);
                }.bind(this));
            }, 800);
        });
    }
    drop() {
    }
    render() {
        let { className, select, text } = this.state;
        let { vars } = this.props;
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: 'game-middle' },
                React.createElement("div", { key: text, className: 'game-text' }, lang_1.default.get(text)),
                React.createElement("div", { className: 'game-input select', ref: 'input' }, vars.map((e, i) => (React.createElement(game_symbol_1.default, { className: (e === select ? 'this' : ''), key: `var${e}${i}`, symbol: e })))))));
    }
}
exports.default = GameQuest;


/***/ }),

/***/ "./components/game-symbol.tsx":
/*!************************************!*\
  !*** ./components/game-symbol.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const react_1 = __webpack_require__(/*! react */ "react");
class GameSymbol extends react_1.Component {
    render() {
        let { symbol, className } = this.props;
        return (React.createElement("div", { className: `${className} game-symbol sym${symbol.charCodeAt(0)}` }));
    }
}
exports.default = GameSymbol;


/***/ }),

/***/ "./components/game-text.tsx":
/*!**********************************!*\
  !*** ./components/game-text.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const react_1 = __webpack_require__(/*! react */ "react");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./lib/lang.ts");
const inp = __webpack_require__(/*! ../lib/keyboard */ "./lib/keyboard.ts");
class GameText extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { className: 'game-view', text: lang_1.default.get(props.text) || props.text };
    }
    componentDidMount() {
        let { delay, text, oninput } = this.props;
        if (delay) {
            inp.subscribe((e) => {
                if (e === 'Enter') {
                    this.drop();
                    clearTimeout(timeout);
                }
            });
            let timeout = setTimeout(() => {
                this.drop();
                clearTimeout(timeout);
            }, delay);
        }
        else
            oninput(this.drop.bind(this));
    }
    drop() {
        let { oninput } = this.props;
        this.setState({ className: 'game-view drop' });
        window.addEventListener('animationend', function v(e) {
            if (e.target !== this.refs['text'])
                return;
            oninput(null);
            window.removeEventListener('animationend', v);
        }.bind(this));
    }
    render() {
        let { className, text } = this.state;
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: 'game-middle' },
                React.createElement("div", { key: text, ref: "text", className: 'game-text' }, lang_1.default.get(text) || text))));
    }
}
exports.default = GameText;


/***/ }),

/***/ "./lib/ajax.ts":
/*!*********************!*\
  !*** ./lib/ajax.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    static toJson(data = {}) {
        return JSON.stringify(data);
    }
    static toQuery(data = {}) {
        let segments = [];
        for (let key in data)
            segments.push(`${key}=${data[key]}`);
        return segments.join('&');
    }
}
exports.Data = Data;
class Ajax {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.xhr = null;
        this.xhr = new XMLHttpRequest();
    }
    send(data = '') {
        let { xhr, options } = this;
        return new Promise((resolve, reject) => {
            for (let header of options.headers || []) {
                if (typeof header === 'string') {
                    let [name, value] = header.split('=');
                    if (name && value)
                        xhr.setRequestHeader(name, value);
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4)
                    return;
                xhr.onerror = reject;
                resolve(xhr.response);
            };
            xhr.send(data);
        });
    }
    get(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let { url, xhr, send } = this;
            let datas = Data.toQuery(data);
            xhr.open('GET', datas ? [url, datas].join('?') : url, true);
            return yield send.apply(this, [null]);
        });
    }
    post(data = {}, urlen = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let { url, xhr, options, send } = this;
            let datas = '';
            xhr.open('POST', url, true);
            if (urlen) {
                datas = Data.toQuery(data);
                options.headers.push('Content-Type=application/x-www-form-urlencoded');
            }
            else {
                datas = Data.toJson(data);
                options.headers.push('Content-Type=application/json');
            }
            return yield send.apply(this, [datas || null]);
        });
    }
}
exports.Ajax = Ajax;


/***/ }),

/***/ "./lib/game.tsx":
/*!**********************!*\
  !*** ./lib/game.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const game_quest_1 = __webpack_require__(/*! ../components/game-quest */ "./components/game-quest.tsx");
const game_input_1 = __webpack_require__(/*! ../components/game-input */ "./components/game-input.tsx");
const game_text_1 = __webpack_require__(/*! ../components/game-text */ "./components/game-text.tsx");
const game_play_1 = __webpack_require__(/*! ../components/game-play */ "./components/game-play.tsx");
const main = document.querySelector('.main');
class Game {
    static quest(id, text, ...vars) {
        return new Promise(resolve => {
            ReactDOM.render(React.createElement(game_quest_1.default, { oninput: resolve, key: id, text: text, vars: vars }), main);
        });
    }
    static input(id, text, limit) {
        return new Promise(resolve => {
            ReactDOM.render(React.createElement(game_input_1.default, { oninput: resolve, key: id, text: text, limit: limit }), main);
        });
    }
    static showtext(id, text, delay = 0) {
        return new Promise(resolve => {
            ReactDOM.render(React.createElement(game_text_1.default, { oninput: resolve, key: id, text: text, delay: delay }), main);
        });
    }
    static play(id = 'plaing', state) {
        return new Promise(resolve => {
            ReactDOM.render(React.createElement(game_play_1.default, { oninput: resolve, key: id, state: state }), main);
        });
    }
    static delay(value = 100) {
        return new Promise(resolve => {
            setTimeout(resolve, value);
        });
    }
}
exports.default = Game;


/***/ }),

/***/ "./lib/keyboard.ts":
/*!*************************!*\
  !*** ./lib/keyboard.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.keySymbols = `abcdefghijklmnopqrstuvwxyz1234567890-=+_)(*&^%$#@!/?\`'"\\|.,`;
exports.accessSymbols = exports.keySymbols.split('');
exports.accessSymbols.push(' ');
for (let sym of exports.accessSymbols)
    if (sym !== sym.toUpperCase())
        exports.accessSymbols.push(sym.toUpperCase());
exports.accessSymbols.push('Enter');
exports.accessSymbols.push('Escape');
exports.accessSymbols.push('Backspace');
let onInputKey;
function subscribe(subscriber) {
    onInputKey = subscriber;
}
exports.subscribe = subscribe;
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (exports.accessSymbols.indexOf(e.key) === -1)
        return;
    if (onInputKey)
        onInputKey(e.key);
});


/***/ }),

/***/ "./lib/lang.ts":
/*!*********************!*\
  !*** ./lib/lang.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(/*! ./ajax */ "./lib/ajax.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./lib/utils.ts");
class Lang {
    static get(code, ...args) {
        let { lang } = this;
        if (code.indexOf(' ') === -1) {
            let re = new RegExp(`${code}=`, '');
            for (let ph of this[lang]) {
                if (re.test(ph)) {
                    ph = ph.replace(re, '');
                    code = utils_1.default.randArray(ph.split(';'));
                }
            }
        }
        for (let arg of args)
            code = code.replace('&', `${arg}`);
        return code;
    }
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            let { lang } = this;
            let ajax = new ajax_1.Ajax(`assets/${lang === 'r' ? 'ru_RU' : 'en_US'}`);
            for (let ph of (yield ajax.get()).split('\n'))
                this[lang].push(ph);
        });
    }
}
Lang.lang = 'e';
Lang.r = [
    'good=Хорошо;Прекрасно;Замечательно;Превосходно;Восхитительно',
    'load=Загрузка;Подождите;Думаю;Что то делаю'
];
Lang.e = [
    'select_lang=Русский [R] | English [E]',
    'good=Good;Nice;Perfect;Very good',
    'load=Loading;Please wait'
];
exports.default = Lang;


/***/ }),

/***/ "./lib/utils.ts":
/*!**********************!*\
  !*** ./lib/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static rand(min, max = null) {
        if (max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else {
            return Math.floor(Math.random() * (min + 1));
        }
    }
    static randArray(array) {
        return array[this.rand(0, array.length - 1)];
    }
}
exports.default = Utils;


/***/ }),

/***/ "./lib/wodrs.ts":
/*!**********************!*\
  !*** ./lib/wodrs.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(/*! ./ajax */ "./lib/ajax.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./lib/utils.ts");
class Words {
    static get(min = 0, max = null) {
        let selects = [];
        for (let word of this.words)
            if (word.length > min && (word.length < max || !max))
                selects.push(word);
        return utils_1.default.randArray(selects);
    }
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ajax = new ajax_1.Ajax('assets/base');
            let words = yield ajax.get();
            for (let word of words.split('\n'))
                this.words.push(word);
            return;
        });
    }
}
Words.words = [];
exports.default = Words;


/***/ }),

/***/ "./main.scss":
/*!*******************!*\
  !*** ./main.scss ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !./node_modules/css-loader!./node_modules/sass-loader/dist/cjs.js?outputStyle=compressed!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/dist/cjs.js?outputStyle=compressed!./main.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ./node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./main.tsx":
/*!******************!*\
  !*** ./main.tsx ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __webpack_require__(/*! ./lib/game */ "./lib/game.tsx");
const lang_1 = __webpack_require__(/*! ./lib/lang */ "./lib/lang.ts");
const wodrs_1 = __webpack_require__(/*! ./lib/wodrs */ "./lib/wodrs.ts");
__webpack_require__(/*! ./main.scss */ "./main.scss");
let start = false, name = 'Player', loaded = false, starts = false;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!loaded) {
            let stopDelay = yield game_1.default.showtext('load', 'load');
            yield wodrs_1.default.load();
            yield lang_1.default.load();
            yield game_1.default.delay(800);
            stopDelay();
            loaded = true;
        }
        if (!start) {
            yield game_1.default.showtext('Привет', 'Привет. Писать только на английской раскладке!', 3000);
            yield game_1.default.showtext('hi', 'Hi. Write only on the English keyboard!', 3000);
            lang_1.default.lang = yield game_1.default.quest('lang', 'select_lang', 'r', 'e');
            yield lang_1.default.load();
            name = yield game_1.default.input('name', 'enter_name', 10);
            if ((yield game_1.default.quest('ready', lang_1.default.get('ready', name), 'y', 'n')) === 'n')
                return main();
            start = true;
        }
        let steps = ['3', '2', '1', 'go'];
        let game = {
            score: 0,
            level: 1,
            attempts: 3,
            name: name
        };
        while (game.attempts > 0) {
            if (!starts) {
                for (let step of steps) {
                    yield game_1.default.showtext(step, step, 1000);
                }
                starts = true;
            }
            game = yield game_1.default.play(`plaing${game.level}${game.time}${game.score}${game.attempts}`, game);
            if (game.fail)
                game.attempts--;
        }
        if ((yield game_1.default.quest(`s${game.level}`, lang_1.default.get('play_again', `${game.score}`), 'y', 'n')) === 'y')
            return main();
        else
            yield game_1.default.showtext('goodbuy', 'goodbuy');
    });
}
window.addEventListener('load', () => main().catch(console.error));


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/dist/cjs.js?outputStyle=compressed!./main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/dist/cjs.js?outputStyle=compressed!./main.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@keyframes gamesymbol{from{transform:scale(0.001) matrix(0.001, 0, 0, 0.001, -1000, 0);opacity:0}to{transform:scale(1) matrix(1, 0, 0, 1, 0, 0);opacity:1}}@keyframes gametext{from{transform:matrix(0.2, 0, 0, 0.2, 0, -500)}to{transform:matrix(1, 0, 0, 1, 0, 0)}}@keyframes gamemiddle{from{transform:matrix(1, 0, 0, 0.1, 0, 0)}to{transform:matrix(1, 0, 0, 1, 0, 0)}}@keyframes dgamesymbol{to{transform:scale(0.001) matrix(0.001, 0, 0, 0.001, -1000, 0);opacity:0}from{transform:scale(1) matrix(1, 0, 0, 1, 0, 0);opacity:1}}@keyframes dgametext{to{transform:matrix(0.2, 0, 0, 0.2, 0, -500)}from{transform:matrix(1, 0, 0, 1, 0, 0)}}@keyframes dgamemiddle{to{transform:matrix(1, 0, 0, 0.001, 0, 0)}from{transform:matrix(1, 0, 0, 1, 0, 0)}}@keyframes inputfail{from{background:rgba(0,0,0,0.8)}to{background:rgba(255,0,0,0.8)}}@keyframes inputsuccess{from{background:rgba(0,0,0,0.8)}to{background:rgba(0,255,0,0.8)}}html,body,.main,.game-view{width:100vw;height:100vh;margin:0;padding:0;position:relative;overflow:hidden}body{background-color:#220022}body .game-view{display:table}body .game-view .game-text{animation:gametext 0.4s both}body .game-view .game-input{animation:gamemiddle 0.2s both}body .game-view .game-symbol{animation:gamesymbol 0.3s both}body .game-view.drop .game-text{animation:dgametext 0.2s both}body .game-view.drop .game-input{animation:dgamemiddle 0.1s both;animation-delay:0.4s}body .game-view.drop .game-symbol{animation:dgamesymbol 0.2s both}body .game-view.fail .game-input{animation:inputfail 0.4s both}body .game-view.success .game-input{animation:inputsuccess 0.4s both}body .game-view .game-header{display:inline-block;position:fixed;text-align:center;margin:auto;padding:20px;top:0;left:0;right:0;color:#fff;background-color:rgba(0,0,0,0.5)}body .game-view .game-header p{display:inline-block;padding:15px}body .game-view .game-middle{display:table-cell;text-align:center;vertical-align:middle;font-size:30px;font-weight:600}body .game-view .game-middle .game-text{color:#fff;margin-bottom:30px}body .game-view .game-middle .select .game-symbol:nth-child(1){animation-delay:0s}body .game-view .game-middle .select .game-symbol:nth-child(2){animation-delay:.2s}body .game-view .game-middle .select .game-symbol:nth-child(3){animation-delay:.4s}body .game-view .game-middle .select .game-symbol:nth-child(4){animation-delay:.6s}body .game-view .game-middle .select .game-symbol:nth-child(5){animation-delay:.8s}body .game-view .game-middle .select .game-symbol:nth-child(6){animation-delay:1s}body .game-view .game-middle .select .game-symbol:nth-child(7){animation-delay:1.2s}body .game-view .game-middle .select .game-symbol:nth-child(8){animation-delay:1.4s}body .game-view .game-middle .select .game-symbol:nth-child(9){animation-delay:1.6s}body .game-view .game-middle .select .game-symbol:nth-child(10){animation-delay:1.8s}body .game-view .game-middle .select .game-symbol:nth-child(11){animation-delay:2s}body .game-view .game-middle .select .game-symbol:nth-child(12){animation-delay:2.2s}body .game-view .game-middle .select .game-symbol:nth-child(13){animation-delay:2.4s}body .game-view .game-middle .select .game-symbol:nth-child(14){animation-delay:2.6s}body .game-view .game-middle .select .game-symbol:nth-child(15){animation-delay:2.8s}body .game-view .game-middle .select .game-symbol:nth-child(16){animation-delay:3s}body .game-view .game-middle .select .game-symbol:nth-child(17){animation-delay:3.2s}body .game-view .game-middle .select .game-symbol:nth-child(18){animation-delay:3.4s}body .game-view .game-middle .select .game-symbol:nth-child(19){animation-delay:3.6s}body .game-view .game-middle .select .game-symbol:nth-child(20){animation-delay:3.8s}body .game-view .game-middle .select .game-symbol:nth-child(21){animation-delay:4s}body .game-view .game-middle .select .game-symbol:nth-child(22){animation-delay:4.2s}body .game-view .game-middle .select .game-symbol:nth-child(23){animation-delay:4.4s}body .game-view .game-middle .select .game-symbol:nth-child(24){animation-delay:4.6s}body .game-view .game-middle .select .game-symbol:nth-child(25){animation-delay:4.8s}body .game-view .game-middle .select .game-symbol:nth-child(26){animation-delay:5s}body .game-view .game-middle .select .game-symbol:nth-child(27){animation-delay:5.2s}body .game-view .game-middle .select .game-symbol:nth-child(28){animation-delay:5.4s}body .game-view .game-middle .select .game-symbol:nth-child(29){animation-delay:5.6s}body .game-view .game-middle .select .game-symbol:nth-child(30){animation-delay:5.8s}body .game-view .game-middle .select .game-symbol:nth-child(31){animation-delay:6s}body .game-view .game-middle .select .game-symbol:nth-child(32){animation-delay:6.2s}body .game-view .game-middle .select .game-symbol:nth-child(33){animation-delay:6.4s}body .game-view .game-middle .select .game-symbol:nth-child(34){animation-delay:6.6s}body .game-view .game-middle .select .game-symbol:nth-child(35){animation-delay:6.8s}body .game-view .game-middle .select .game-symbol:nth-child(36){animation-delay:7s}body .game-view .game-middle .select .game-symbol:nth-child(37){animation-delay:7.2s}body .game-view .game-middle .select .game-symbol:nth-child(38){animation-delay:7.4s}body .game-view .game-middle .select .game-symbol:nth-child(39){animation-delay:7.6s}body .game-view .game-middle .select .game-symbol:nth-child(40){animation-delay:7.8s}body .game-view .game-middle .select .game-symbol:nth-child(41){animation-delay:8s}body .game-view .game-middle .select .game-symbol:nth-child(42){animation-delay:8.2s}body .game-view .game-middle .select .game-symbol:nth-child(43){animation-delay:8.4s}body .game-view .game-middle .select .game-symbol:nth-child(44){animation-delay:8.6s}body .game-view .game-middle .select .game-symbol:nth-child(45){animation-delay:8.8s}body .game-view .game-middle .select .game-symbol:nth-child(46){animation-delay:9s}body .game-view .game-middle .select .game-symbol:nth-child(47){animation-delay:9.2s}body .game-view .game-middle .select .game-symbol:nth-child(48){animation-delay:9.4s}body .game-view .game-middle .select .game-symbol:nth-child(49){animation-delay:9.6s}body .game-view .game-middle .select .game-symbol:nth-child(50){animation-delay:9.8s}body .game-view .game-middle .game-input{width:100%;background:rgba(0,0,0,0.8);color:#fff}body .game-view .game-middle .game-input.select{text-transform:uppercase}body .game-view .game-middle .game-input .game-symbol{width:80px;height:80px;line-height:80px;transition-duration:0.3;display:inline-block;border:2px solid;margin:5px}body .game-view .game-middle .game-input .game-symbol.this{background-color:#999}body .game-view .game-middle .game-input .game-symbol::before{content:\"~\";display:inline-block;width:80px;height:80px;line-height:80px}body .game-view .game-middle .game-input .game-symbol.sym97::before{content:\"a\"}body .game-view .game-middle .game-input .game-symbol.sym98::before{content:\"b\"}body .game-view .game-middle .game-input .game-symbol.sym99::before{content:\"c\"}body .game-view .game-middle .game-input .game-symbol.sym100::before{content:\"d\"}body .game-view .game-middle .game-input .game-symbol.sym101::before{content:\"e\"}body .game-view .game-middle .game-input .game-symbol.sym102::before{content:\"f\"}body .game-view .game-middle .game-input .game-symbol.sym103::before{content:\"g\"}body .game-view .game-middle .game-input .game-symbol.sym104::before{content:\"h\"}body .game-view .game-middle .game-input .game-symbol.sym105::before{content:\"i\"}body .game-view .game-middle .game-input .game-symbol.sym106::before{content:\"j\"}body .game-view .game-middle .game-input .game-symbol.sym107::before{content:\"k\"}body .game-view .game-middle .game-input .game-symbol.sym108::before{content:\"l\"}body .game-view .game-middle .game-input .game-symbol.sym109::before{content:\"m\"}body .game-view .game-middle .game-input .game-symbol.sym110::before{content:\"n\"}body .game-view .game-middle .game-input .game-symbol.sym111::before{content:\"o\"}body .game-view .game-middle .game-input .game-symbol.sym112::before{content:\"p\"}body .game-view .game-middle .game-input .game-symbol.sym113::before{content:\"q\"}body .game-view .game-middle .game-input .game-symbol.sym114::before{content:\"r\"}body .game-view .game-middle .game-input .game-symbol.sym115::before{content:\"s\"}body .game-view .game-middle .game-input .game-symbol.sym116::before{content:\"t\"}body .game-view .game-middle .game-input .game-symbol.sym117::before{content:\"u\"}body .game-view .game-middle .game-input .game-symbol.sym118::before{content:\"v\"}body .game-view .game-middle .game-input .game-symbol.sym119::before{content:\"w\"}body .game-view .game-middle .game-input .game-symbol.sym120::before{content:\"x\"}body .game-view .game-middle .game-input .game-symbol.sym121::before{content:\"y\"}body .game-view .game-middle .game-input .game-symbol.sym122::before{content:\"z\"}body .game-view .game-middle .game-input .game-symbol.sym49::before{content:\"1\"}body .game-view .game-middle .game-input .game-symbol.sym50::before{content:\"2\"}body .game-view .game-middle .game-input .game-symbol.sym51::before{content:\"3\"}body .game-view .game-middle .game-input .game-symbol.sym52::before{content:\"4\"}body .game-view .game-middle .game-input .game-symbol.sym53::before{content:\"5\"}body .game-view .game-middle .game-input .game-symbol.sym54::before{content:\"6\"}body .game-view .game-middle .game-input .game-symbol.sym55::before{content:\"7\"}body .game-view .game-middle .game-input .game-symbol.sym56::before{content:\"8\"}body .game-view .game-middle .game-input .game-symbol.sym57::before{content:\"9\"}body .game-view .game-middle .game-input .game-symbol.sym48::before{content:\"0\"}body .game-view .game-middle .game-input .game-symbol.sym45::before{content:\"-\"}body .game-view .game-middle .game-input .game-symbol.sym61::before{content:\"=\"}body .game-view .game-middle .game-input .game-symbol.sym43::before{content:\"+\"}body .game-view .game-middle .game-input .game-symbol.sym95::before{content:\"_\"}body .game-view .game-middle .game-input .game-symbol.sym41::before{content:\")\"}body .game-view .game-middle .game-input .game-symbol.sym40::before{content:\"(\"}body .game-view .game-middle .game-input .game-symbol.sym42::before{content:\"*\"}body .game-view .game-middle .game-input .game-symbol.sym38::before{content:\"&\"}body .game-view .game-middle .game-input .game-symbol.sym94::before{content:\"^\"}body .game-view .game-middle .game-input .game-symbol.sym37::before{content:\"%\"}body .game-view .game-middle .game-input .game-symbol.sym36::before{content:\"$\"}body .game-view .game-middle .game-input .game-symbol.sym35::before{content:\"#\"}body .game-view .game-middle .game-input .game-symbol.sym64::before{content:\"@\"}body .game-view .game-middle .game-input .game-symbol.sym33::before{content:\"!\"}body .game-view .game-middle .game-input .game-symbol.sym47::before{content:\"/\"}body .game-view .game-middle .game-input .game-symbol.sym63::before{content:\"?\"}body .game-view .game-middle .game-input .game-symbol.sym96::before{content:\"`\"}body .game-view .game-middle .game-input .game-symbol.sym39::before{content:\"'\"}body .game-view .game-middle .game-input .game-symbol.sym34::before{content:\"\\\"\"}body .game-view .game-middle .game-input .game-symbol.sym92::before{content:\"\\\\\"}body .game-view .game-middle .game-input .game-symbol.sym124::before{content:\"|\"}body .game-view .game-middle .game-input .game-symbol.sym46::before{content:\".\"}body .game-view .game-middle .game-input .game-symbol.sym44::before{content:\",\"}body .game-view .game-middle .game-input .game-symbol.sym65::before{content:\"A\"}body .game-view .game-middle .game-input .game-symbol.sym66::before{content:\"B\"}body .game-view .game-middle .game-input .game-symbol.sym67::before{content:\"C\"}body .game-view .game-middle .game-input .game-symbol.sym68::before{content:\"D\"}body .game-view .game-middle .game-input .game-symbol.sym69::before{content:\"E\"}body .game-view .game-middle .game-input .game-symbol.sym70::before{content:\"F\"}body .game-view .game-middle .game-input .game-symbol.sym71::before{content:\"G\"}body .game-view .game-middle .game-input .game-symbol.sym72::before{content:\"H\"}body .game-view .game-middle .game-input .game-symbol.sym73::before{content:\"I\"}body .game-view .game-middle .game-input .game-symbol.sym74::before{content:\"J\"}body .game-view .game-middle .game-input .game-symbol.sym75::before{content:\"K\"}body .game-view .game-middle .game-input .game-symbol.sym76::before{content:\"L\"}body .game-view .game-middle .game-input .game-symbol.sym77::before{content:\"M\"}body .game-view .game-middle .game-input .game-symbol.sym78::before{content:\"N\"}body .game-view .game-middle .game-input .game-symbol.sym79::before{content:\"O\"}body .game-view .game-middle .game-input .game-symbol.sym80::before{content:\"P\"}body .game-view .game-middle .game-input .game-symbol.sym81::before{content:\"Q\"}body .game-view .game-middle .game-input .game-symbol.sym82::before{content:\"R\"}body .game-view .game-middle .game-input .game-symbol.sym83::before{content:\"S\"}body .game-view .game-middle .game-input .game-symbol.sym84::before{content:\"T\"}body .game-view .game-middle .game-input .game-symbol.sym85::before{content:\"U\"}body .game-view .game-middle .game-input .game-symbol.sym86::before{content:\"V\"}body .game-view .game-middle .game-input .game-symbol.sym87::before{content:\"W\"}body .game-view .game-middle .game-input .game-symbol.sym88::before{content:\"X\"}body .game-view .game-middle .game-input .game-symbol.sym89::before{content:\"Y\"}body .game-view .game-middle .game-input .game-symbol.sym90::before{content:\"Z\"}body .game-view .game-middle .game-input .game-symbol.sym32{color:transparent}body .game-view .game-middle .game-input .game-symbol.sym32::before{content:\"~\"}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map