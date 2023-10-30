import { curveCardinal } from '@visx/curve'
import {
  AnimatedGrid,
  XYChart,
  Tooltip,
  Axis,
  AnimatedAreaSeries,
  AnimatedAreaStack,
  buildChartTheme
} from '@visx/xychart'
import dayjs from 'dayjs'
import { DailyIntervalType } from '../types'
import isMobile from 'is-mobile'

const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
interface ChartProps {
  data: DailyIntervalType[]
}

const customTheme = buildChartTheme({
  backgroundColor: '#fff',
  colors: ['rgba(0, 169, 187, 0.5)'],
  gridColor: '#00A9BB',
  tickLength: 8,
  gridColorDark: ''
})

const Chart = ({ data }: ChartProps): JSX.Element => {
  const IsMobile = isMobile()
  return (
    <div className="relative flex justify-center overflow-hidden">
      <XYChart
        height={350}
        theme={customTheme}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <Axis
          orientation="bottom"
          hideAxisLine
          hideTicks
          hideZero
          numTicks={IsMobile ? 4 : 8}
          tickFormat={(d) => `${monthsShort[dayjs(d).month()]} ${dayjs(d).year()}`}
        />
        <Axis
          orientation="left"
          hideAxisLine
          hideTicks
          hideZero
          tickValues={[1000, 2000, 3000, 4000]}
          labelProps={{ fontSize: 12, fontWeight: 600 }}
        />

        <AnimatedGrid
          columns={false}
          numTicks={5}
          strokeDasharray="5, 5"
          stroke="#00A9BB"
          lineStyle={{ opacity: 0.5 }}
        />

        <AnimatedAreaStack curve={curveCardinal} renderLine>
          <AnimatedAreaSeries
            dataKey="Daily Interval"
            data={data}
            xAccessor={(d) => d.date}
            yAccessor={(d) => d.count}
            fillOpacity={0.3}
          />
        </AnimatedAreaStack>

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData }: any) => (
            <div className="text-xs">
              <div className="mb-1">Swaps</div>

              <div className="mb-1">
                {dayjs(tooltipData.nearestDatum.datum.date.split('T')[0]).format(
                  'dddd, YYYY MMMM DD'
                )}
              </div>
              <div className="mb-1">Count: {tooltipData.nearestDatum.datum.count}</div>
            </div>
          )}
        />
      </XYChart>
      <div className="w-full h-12 absolute bottom-12 from-[#00a9bb00] to-[#fff] bg-gradient-to-b" />
    </div>
  )
}

export default Chart
