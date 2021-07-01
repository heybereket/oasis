package termoasis

import (
	"strconv"
	"time"

	"github.com/shurcooL/graphql"
)

func ConvertToTime(rawTimestamp graphql.String) (*time.Time, error) {
	timestamp, err := strconv.ParseInt(string(rawTimestamp), 10, 64)
	if err != nil {
		return nil, err
	}
	date := time.Unix(0, timestamp*int64(time.Millisecond))
	return &date, nil
}
