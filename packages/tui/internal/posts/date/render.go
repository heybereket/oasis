package termoasis

import (
	"time"

	"github.com/charmbracelet/lipgloss"
)

type Date struct {
	Timestamp time.Time
}

func (d Date) Render() string {
	DateStyle := lipgloss.NewStyle().Bold(true)
	formattedTime := d.Timestamp.Format("2006-01-02 03:04")
	return DateStyle.Render(formattedTime)
}
