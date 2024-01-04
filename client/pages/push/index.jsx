import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useMemoizedFn } from 'ahooks';
import { useRTCPeerConnection, useWebsocketPush } from '@/common/hooks';

import styles from './style.scss';

const PushPage = () => {
  const videoRef = useRef();

  // ws接收sdp
  // eslint-disable-next-line no-use-before-define
  const onWsSdpHandle = useMemoizedFn((sdp) => offer.setRemoteDesc(sdp));
  // ws接收ice
  // eslint-disable-next-line no-use-before-define
  const onWsIceHandle = useMemoizedFn((candidate) => offer.addIceCandidate(candidate));
  // 连接器icecandidate事件
  // eslint-disable-next-line no-use-before-define
  const onIcecandidate = useMemoizedFn((ev) => wsIns.emit('ice', ev.candidate));

  const wsIns = useWebsocketPush({
    sdp: onWsSdpHandle,
    ice: onWsIceHandle,
  });
  const offer = useRTCPeerConnection({
    type: 'offer',
    onIcecandidate,
  });

  // 开始
  const startHandle = useMemoizedFn(async () => {
    try {
      const constraints = {
        audio: false,
        video: true,
      };
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      // 播放本地流
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      stream.getTracks()
        .forEach((track) => offer.connection.addTrack(track, stream));

      const sdp = await offer.createSession();

      wsIns.emit('sdp', sdp);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e.message);
    }
  });

  return (
    <main>
      <Helmet>
        <title>WebRtc推流</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.player}>
          <video className={styles.playerInner} ref={videoRef} />
        </div>
        <button type="button" onClick={startHandle}>开始</button>
      </div>
    </main>
  );
};

export default PushPage;
