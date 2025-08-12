<VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
  {({ isVisible }) => (
    <p className="text-3xl font-bold text-indigo-600 mb-2">
      {isVisible ? (
        <CountUp
          end={stat.number}
          suffix={stat.suffix}
          duration={2.5}
          separator=","
        />
      ) : null}
    </p>
  )}
</VisibilitySensor>