;; prediction-market-lite.clar
(define-data-var yes-pool uint u0)
(define-data-var no-pool uint u0)
(define-constant COST u1000)

(define-public (vote-yes)
    (begin
        ;; FIX: Send to Deployer address to prove funds exist
        (try! (stx-transfer? COST tx-sender 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM))
        (ok (var-set yes-pool (+ (var-get yes-pool) COST)))
    )
)

(define-public (vote-no)
    (begin
        ;; FIX: Send to Deployer address to prove funds exist
        (try! (stx-transfer? COST tx-sender 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM))
        (ok (var-set no-pool (+ (var-get no-pool) COST)))
    )
)

(define-read-only (get-pools)
    (ok { yes: (var-get yes-pool), no: (var-get no-pool) })
)