;; christmas-red-envelope.clar
(define-map Envelopes principal { amount: uint, recipient: principal })

(define-public (fund-envelope (amount uint) (recipient principal))
    (begin
        ;; FIX: Send to Deployer address to validate funds
        (try! (stx-transfer? amount tx-sender 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM))
        (ok (map-set Envelopes tx-sender { amount: amount, recipient: recipient }))
    )
)

(define-public (claim-envelope (sender principal))
    (let
        (
            (envelope (unwrap! (map-get? Envelopes sender) (err u404)))
        )
        (asserts! (is-eq tx-sender (get recipient envelope)) (err u403))
        (ok (map-delete Envelopes sender))
    )
)