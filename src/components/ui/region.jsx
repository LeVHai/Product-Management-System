export default function Region({className, style, children }) {
  return (
    <div className={`q-region ${className ?? ""}`} style={style}>
      {children ? children : null}
    </div>
  );
}

export function RegionCenter({className, children }) {
  return (
    <div className={`q-region-center ${className ?? ""}`}>
      {children ? children : null}
    </div>
  );
}

export function RegionTop({className, children }) {
  return (
    <div className={`q-region-top ${className ?? ""}`}>
      {children ? children : null}
    </div>
  );
}
export function RegionBottom({className, children }) {
  return (
    <div className={`q-region-bottom ${className ?? ""}`}>
      {children ? children : null}
    </div>
  );
}