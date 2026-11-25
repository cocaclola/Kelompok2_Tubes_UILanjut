import React from 'react';

export default function Box3D({
  config,
  index,
  boxRef,
  status,
  onHitClick,
  children
}) {
  const [l1, l2] = config.label;
  const classes = [
    'box',
    config.color,
    status?.pile ? 'pile' : '',
    status?.open ? 'open' : '',
    status?.inside ? 'inside' : '',
    status?.gone ? 'gone' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      id={`b${index}`}
      ref={boxRef}
    >
      <div className="f bt"></div>
      <div className="f wall">
        <div className="in" id={`in-${config.id}`} tabIndex="0">
          {children}
        </div>
      </div>
      <div className="f side l">
        <i className="in2"></i>
      </div>
      <div className="f side r">
        <i className="in2"></i>
      </div>
      <div className="f tp pf">
        <i className="in2"></i>
        <i className="tape"></i>
        <i className="bl" style={{ left: '8%', top: '12%', background: '#ffa6d0' }}></i>
        <i className="bl" style={{ left: '70%', top: '14%', background: '#8fd3ff' }}></i>
        <i className="bl" style={{ left: '12%', top: '68%', background: '#ffe14d' }}></i>
        <i className="bl" style={{ left: '44%', top: '70%', background: '#9fe8c4' }}></i>
        <i className="bl" style={{ left: '80%', top: '66%', background: '#c9b3ff' }}></i>
      </div>
      <div className="f front">
        <div className="door dl">
          <div className="df pf">
            <div className="t">
              {l1}
              <br />
              {l2 || ''}
            </div>
            <div className="sm">Sekotak ide berani &amp; keseruan yang serius</div>
          </div>
          <div className="db"></div>
        </div>
        <div className="door dr">
          <div className="df pf">
            <div className="t">
              {l1}
              <br />
              {l2 || ''}
            </div>
            <i className="face"></i>
            <span className="tg">{config.tag}</span>
          </div>
          <div className="db"></div>
        </div>
        <button
          className="hit"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onHitClick(index);
          }}
          aria-label={`Buka kardus ${config.title}`}
        ></button>
      </div>
    </div>
  );
}
