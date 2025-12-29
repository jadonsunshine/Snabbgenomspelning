;; simple-points.clar
(define-map Points principal uint)

(define-public (earn-points)
    (let
        (
            (current-balance (default-to u0 (map-get? Points tx-sender)))
        )
        ;; Give 10 points per call
        (ok (map-set Points tx-sender (+ current-balance u10)))
    )
)

(define-public (transfer-points (amount uint) (recipient principal))
    (let
        (
            (sender-balance (default-to u0 (map-get? Points tx-sender)))
            (recipient-balance (default-to u0 (map-get? Points recipient)))
        )
        (asserts! (>= sender-balance amount) (err u100))
        (map-set Points tx-sender (- sender-balance amount))
        (ok (map-set Points recipient (+ recipient-balance amount)))
    )
)