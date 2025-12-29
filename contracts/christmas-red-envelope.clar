;; christmas-red-envelope.clar
(define-map Envelopes principal { amount: uint, recipient: principal })

(define-public (fund-envelope (amount uint) (recipient principal))
    (begin
        ;; Transfer STX from user to this contract
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (ok (map-set Envelopes tx-sender { amount: amount, recipient: recipient }))
    )
)

(define-public (claim-envelope (sender principal))
    (let
        (
            (envelope (unwrap! (map-get? Envelopes sender) (err u404)))
        )
        ;; Only the intended recipient can claim
        (asserts! (is-eq tx-sender (get recipient envelope)) (err u403))
        ;; Transfer STX from contract to recipient
        (try! (as-contract (stx-transfer? (get amount envelope) tx-sender (get recipient envelope))))
        (ok (map-delete Envelopes sender))
    )
)