export function BootScreen() {
  return (
    <div id="boot" className="boot" role="status" aria-live="polite" aria-label="Loading Sydrek">
      <div className="boot-grid" aria-hidden />
      <div className="boot-glow" aria-hidden />
      <div className="boot-stage">
        <div className="boot-emblem">
          <span className="boot-floor" aria-hidden />
          <div className="boot-mark">
            <img src="/brand/symbol.svg" alt="" width={460} height={284} className="boot-piece is-left" />
            <img src="/brand/symbol.svg" alt="" width={460} height={284} className="boot-piece is-core" />
            <img src="/brand/symbol.svg" alt="" width={460} height={284} className="boot-piece is-right" />
            <span className="boot-sheen" aria-hidden />
          </div>
        </div>
        <p className="boot-word" aria-hidden>
          sydre<span className="boot-k">k</span>
        </p>
        <div className="boot-hairline" aria-hidden>
          <span />
        </div>
        <p className="boot-kicker">Software · AI · Automation</p>
      </div>
    </div>
  );
}
