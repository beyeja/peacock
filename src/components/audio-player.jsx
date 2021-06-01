import React from 'react';

const AudioPlayer = () => {
  console.log('hey');
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio className="w-2/3" controls>
        <source src="/trust-yourself-arnold-schwarzenegger.mp3" />
        Klappt nich
      </audio>
    </>
  );
};

export default AudioPlayer;
