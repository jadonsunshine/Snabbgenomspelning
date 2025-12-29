;; daily-checkin.clar
(define-map LastCheckIn principal uint)

(define-public (check-in)
    (let
        (
            (last-height (default-to u0 (map-get? LastCheckIn tx-sender)))
            (current-height block-height)
        )
        ;; Ensure at least 1 block has passed since last time
        (asserts! (> current-height last-height) (err u400))
        (ok (map-set LastCheckIn tx-sender current-height))
    )
)

(define-read-only (get-last-height (user principal))
    (ok (map-get? LastCheckIn user))
)