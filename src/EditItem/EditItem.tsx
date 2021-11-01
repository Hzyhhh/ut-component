/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, FC} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

export interface AProps {
  ticket?: string;
}

// 动作库
const move = ['举手', '投足', '挤眉', '弄眼', '转头'];
// 语言库
const speak = ['钱', '衣服', '聊宠物', '车', '歌手'];

/**
 * 功能如下：
 * 倒计时5秒后选择动作库或者语言库内任意一个词展示
 */

const App: FC<AProps> = props => {
  const {ticket} = props;
  const [select, setSelect] = useState('请开始游戏');
  const [target, setTarget] = useState('');
  const [countdown, setCountDown] = useState(5);
  const [isCountDown, setIsCountDown] = useState(false);

  const random = () => {
    const arr = move.concat(speak);
    const randomCount = Math.floor(Math.random() * arr.length);

    if (randomCount <= move.length) {
      setSelect('不能做挑战');
      setTarget(move[randomCount - 1]);
    } else {
      setSelect('不能说挑战');
      setTarget(speak[randomCount - move.length - 1]);
    }
  };

  const handleStart = () => {
    console.log(123);
    setIsCountDown(true);
    random();
  };

  useEffect(() => {
    let timer: NodeJS.Timer;

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

  return (
    <SafeAreaView style={styles.SafeViewWrapper}>
      <ImageBackground style={styles.backgroundWrapper} source={{uri: ''}}>
        <View style={styles.ScrollWrapper}>
          {/* mainWrapper */}
          <View style={[styles.mainWrapper, styles.shadowBg]}>
            {/* header */}
            <View style={styles.center}>
              <Text style={styles.title}>
                {isCountDown ? `倒计时${countdown}秒` : select}
              </Text>
              {!isCountDown && countdown === 5 && (
                <Text style={styles.title}>{target}</Text>
              )}
            </View>
            {/* content */}
            <TouchableOpacity
              onPress={handleStart}
              style={[styles.btWrapper, styles.shadowBg]}>
              <Text style={styles.btTitle}>发</Text>
              <Text style={styles.btTitle}>新</Text>
              <Text style={styles.btTitle}>牌</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
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
