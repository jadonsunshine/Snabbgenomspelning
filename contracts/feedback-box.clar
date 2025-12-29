;; feedback-box.clar
(define-map Feedback { id: uint } { user: principal, rating: uint, comment: (string-ascii 50) })
(define-data-var feedback-count uint u0)

(define-public (log-feedback (rating uint) (comment (string-ascii 50)))
    (let
        (
            (current-id (var-get feedback-count))
        )
        (asserts! (and (>= rating u1) (<= rating u5)) (err u500))
        (map-set Feedback { id: current-id } { user: tx-sender, rating: rating, comment: comment })
        (ok (var-set feedback-count (+ current-id u1)))
    )
)

(define-read-only (get-feedback (id uint))
    (ok (map-get? Feedback { id: id }))
)