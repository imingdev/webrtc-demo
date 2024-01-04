import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useMemoizedFn } from 'ahooks';
import { useRTCPeerConnection, useWebsocketPush } from '@/common/hooks';

import styles from './style.scss';

const PullPage = () => {
  const videoRef = useRef();

  // ws接收sdp
  const onWsSdpHandle = useMemoizedFn(async (sdp) => {
    // eslint-disable-next-line no-use-before-define
    await answer.setRemoteDesc(sdp);
    // eslint-disable-next-line no-use-before-define
    const session = await answer.createSession();

    // eslint-disable-next-line no-use-before-define
    wsIns.emit('sdp', session);
  });
  // ws接收ice
  // eslint-disable-next-line no-use-before-define
  const onWsIceHandle = useMemoizedFn((candidate) => answer.addIceCandidate(candidate));
  // 连接器icecandidate事件
  // eslint-disable-next-line no-use-before-define
  const onIcecandidate = useMemoizedFn((ev) => wsIns.emit('ice', ev.candidate));
  // 连接器track事件
  const onTrackHandle = useMemoizedFn((ev) => ev.streams.forEach((stream) => {
    videoRef.current.srcObject = stream;
  }));
  const onPlayHandle = () => videoRef.current.play();

  const wsIns = useWebsocketPush({
    sdp: onWsSdpHandle,
    ice: onWsIceHandle,
  });
  const answer = useRTCPeerConnection({
    type: 'answer',
    onIcecandidate,
    onTrack: onTrackHandle,
  });

  return (
    <main>
      <Helmet>
        <title>WebRtc拉流</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.player}>
          <video className={styles.playerInner} ref={videoRef} onClick={onPlayHandle} autoPlay muted />
        </div>
      </div>
    </main>
  );
};

export default PullPage;
