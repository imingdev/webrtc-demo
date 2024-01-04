import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import Space from '@/components/Space';
import { useRTCPeerConnection } from '@/common/hooks';

import styles from './style.scss';

const HomePage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const local = useRTCPeerConnection({
    type: 'offer',
    // eslint-disable-next-line no-use-before-define
    onIcecandidate: (ev) => remote.addIceCandidate(ev.candidate),
  });
  const remote = useRTCPeerConnection({
    type: 'answer',
    onTrack: (ev) => ev.streams.forEach((stream) => {
      remoteVideoRef.current.srcObject = stream;
    }),
    onIcecandidate: (ev) => local.addIceCandidate(ev.candidate),
  });

  // 开始
  const startHandle = async () => {
    try {
      const constraints = {
        audio: false,
        video: true,
      };
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      // 播放本地流
      localVideoRef.current.srcObject = stream;
      await localVideoRef.current.play();

      stream.getTracks()
        .forEach((track) => local.connection.addTrack(track, stream));

      const sdp = await local.createSession();

      await remote.setRemoteDesc(sdp);

      const answer = await remote.createSession();
      await local.setRemoteDesc(answer);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <main>
      <Helmet>
        <title>WebRtc推流</title>
      </Helmet>
      <Space className={styles.container} block>
        <div className={styles.player}>
          <video className={styles.playerInner} ref={localVideoRef} autoPlay />
          <button className={styles.start} type="button" onClick={startHandle}>开始</button>
        </div>
        <div className={styles.player}>
          <video className={styles.playerInner} ref={remoteVideoRef} autoPlay />
        </div>
      </Space>
    </main>
  );
};

export default HomePage;
