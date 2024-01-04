import { useEffect, useMemo, useState } from 'react';
import SocketClient from 'socket.io-client';
import isFunctionFn from 'lodash/isFunction';
import isPlainObjectFn from 'lodash/isPlainObject';
import { useCreation, useEventListener } from 'ahooks';

/**
 * websocket推送
 * @param {Object/Function} callback 消息回调
 * @param {Boolean} ready 是否准备好连接
 * @return socket.io-client实例
 */
export const useWebsocketPush = (callback, { ready = true } = {}) => {
  const [instance, setInstance] = useState(null);

  const listener = useMemo(() => {
    if (isPlainObjectFn(callback)) {
      return callback;
    }

    return {
      message: callback,
    };
  }, [callback]);

  useEffect(() => {
    if (ready) {
      const ins = SocketClient('ws://localhost:9999', { transports: ['websocket'] });

      Object.keys(listener)
        .forEach((name) => {
          ins.on(name, (str) => {
            let result;
            try {
              result = JSON.parse(str);
            } catch (e) {
              result = str;
            }

            const fn = listener[name];
            if (isFunctionFn(fn)) {
              fn(result, ins);
            }
          });
        });
      setInstance(ins);

      return () => {
        ins.disconnect();
        setInstance(null);
      };
    }
  }, [ready]);

  return instance;
};
export const useRTCPeerConnection = ({
  type,
  onTrack,
  onIcecandidate,
}) => {
  const connection = useCreation(() => new RTCPeerConnection(), []);

  useEventListener(
    'track',
    onTrack,
    {
      target: connection,
    },
  );
  useEventListener(
    'icecandidate',
    onIcecandidate,
    {
      target: connection,
    },
  );

  // 创建offer或者answer
  const createSessionHandle = async () => {
    let desc;

    if (type === 'offer') {
      // 创建offer
      desc = await connection.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
      });
    } else if (type === 'answer') {
      // 创建answer
      desc = await connection.createAnswer();
    }

    if (desc) {
      // 设置sdp
      await connection.setLocalDescription(desc);

      return desc;
    }
  };
  // 设置远程sdp
  const setRemoteDescHandle = async (desc) => {
    // 设置远程sdp
    await connection.setRemoteDescription(desc);
  };
  // 添加ice
  const addIceCandidateHandle = (ice) => ice&&connection.addIceCandidate(ice);

  return {
    connection,
    createSession: createSessionHandle,
    setRemoteDesc: setRemoteDescHandle,
    addIceCandidate: addIceCandidateHandle,
  };
};
