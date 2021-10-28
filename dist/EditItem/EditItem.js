"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
// 动作库
const move = ['举手', '投足', '挤眉', '弄眼', '转头'];
// 语言库
const speak = ['钱', '衣服', '聊宠物', '车', '歌手'];
/**
 * 功能如下：
 * 倒计时5秒后选择动作库或者语言库内任意一个词展示
 */
const App = props => {
    const { ticket } = props;
    const [select, setSelect] = (0, react_1.useState)('请开始游戏');
    const [target, setTarget] = (0, react_1.useState)('');
    const [countdown, setCountDown] = (0, react_1.useState)(5);
    const [isCountDown, setIsCountDown] = (0, react_1.useState)(false);
    const random = () => {
        const arr = move.concat(speak);
        const randomCount = Math.floor(Math.random() * arr.length);
        if (randomCount <= move.length) {
            setSelect('不能做挑战');
            setTarget(move[randomCount - 1]);
        }
        else {
            setSelect('不能说挑战');
            setTarget(speak[randomCount - move.length - 1]);
        }
    };
    const handleStart = () => {
        console.log(123);
        setIsCountDown(true);
        random();
    };
    (0, react_1.useEffect)(() => {
        let timer;
        if (isCountDown) {
            timer = setInterval(() => {
                setCountDown(v => --v);
            }, 1000);
            if (!countdown) {
                clearInterval(timer);
                setCountDown(5);
                setIsCountDown(false);
            }
        }
        return () => {
            clearInterval(timer);
        };
    }, [countdown, isCountDown]);
    return (<react_native_1.SafeAreaView style={styles.SafeViewWrapper}>
      <react_native_1.ImageBackground style={styles.backgroundWrapper} source={{ uri: '' }}>
        <react_native_1.View style={styles.ScrollWrapper}>
          {/* mainWrapper */}
          <react_native_1.View style={[styles.mainWrapper, styles.shadowBg]}>
            {/* header */}
            <react_native_1.View style={styles.center}>
              <react_native_1.Text style={styles.title}>
                {isCountDown ? `倒计时${countdown}秒` : select}
              </react_native_1.Text>
              {!isCountDown && countdown === 5 && (<react_native_1.Text style={styles.title}>{target}</react_native_1.Text>)}
            </react_native_1.View>
            {/* content */}
            <react_native_1.TouchableOpacity onPress={handleStart} style={[styles.btWrapper, styles.shadowBg]}>
              <react_native_1.Text style={styles.btTitle}>发</react_native_1.Text>
              <react_native_1.Text style={styles.btTitle}>新</react_native_1.Text>
              <react_native_1.Text style={styles.btTitle}>牌</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.ImageBackground>
    </react_native_1.SafeAreaView>);
};
exports.default = App;
const styles = react_native_1.StyleSheet.create({
    SafeViewWrapper: {},
    backgroundWrapper: {
        width: '100%',
        height: '100%',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 58,
    },
    btWrapper: {
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%',
        height: '13%',
        borderRadius: 50,
        backgroundColor: '#F1C01B',
    },
    shadowBg: {
        // 兼容安卓 fuck
        elevation: 8,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: '#000',
        shadowRadius: 16,
    },
    btTitle: {
        fontSize: 20,
        color: '#fff',
    },
    ScrollWrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainWrapper: {
        position: 'absolute',
        top: 100,
        width: '90%',
        height: 400,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f1f1f1',
        shadowColor: 'black',
    },
});
