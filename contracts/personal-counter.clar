;; personal-counter.clar
(define-map Counters principal uint)

(define-public (increment)
    (let
        (
            (current-count (default-to u0 (map-get? Counters tx-sender)))
        )
        (ok (map-set Counters tx-sender (+ current-count u1)))
    )
)

(define-read-only (get-count (user principal))
    (ok (default-to u0 (map-get? Counters user)))
)