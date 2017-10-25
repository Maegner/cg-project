import math
import os


#################################################### Horizontal Straight Line START #################################

class HorizontalStraightLine:

	def __init__(self,leftBoundary,rightBoundary,y):
		self.leftBoundary = leftBoundary
		self.rightBoundary = rightBoundary
		self.yPosition = y

	def getLeftBoundary(self):
		return self.leftBoundary

	def getRightBOundary(self):
		return self.rightBoundary

	def getYPosition(self):
		return self.yPosition

#################################################### Horizontal Straight Line End ###################################

#################################################### Vertical Straight Line Start ###################################

class VerticalStraightLine:

	def __init__(self,topBoundary,bottomBoundary,x):
		self.topBoundary = topBoundary
		self.bottomBoundary = bottomBoundary
		self.xPosition = x

	def getTopBoundary(self):
		return self.topBoundary

	def getBottomBoundary(self):
		return self.bottomBoundary

	def getXPosition(self):
		return self.xPosition

#################################################### Vertical Straight Line END ###################################


def lineOnXX(trackWidth,bottomLine,topLine, spacing):

	result = ""

    ############################### TopLine points START ###############################

	for x in range (topLine.getLeftBoundary(),topLine.getRightBOundary(), spacing):

		topPoint = "[{},{},0],".format(x,topLine.getYPosition()+trackWidth)

		result += topPoint

    ################################ TopLine points END ################################

    ############################### BottomLine points START ############################   	

	for x in range (bottomLine.getLeftBoundary(),bottomLine.getRightBOundary(), spacing):

		bottomPoint = "[{},{},0],".format(x,bottomLine.getYPosition())

		result += bottomPoint
   
    ############################### BottomLine points END ###############################
	return result

def LineOnYYFlexible(trackWidth,leftLine, rightLine, spacing):

	result = ""

	for y in range (rightLine.getBottomBoundary(),rightLine.getTopBoundary(),spacing):

		rightPoint = "[{},{},0],".format(topLine.getXPosition()+trackWidth,x)

		result += rightPoint

	for y in range (leftLine.getBottomBoundary(), leftLine.getTopBoundary(), spacing):
		
		leftPoint = "[{},{},0],".format(topLine.getXPosition(),x)

		result += leftPoint

def lineOnYY(trackWidth,leftBottomBoundary,rightBottomBoundary,topBoundary,spacing,x,facing):  #TODO factorizar isto && ENABLE FACING == 1

	result = ""


	for y in range (rightBottomBoundary,topBoundary+spacing,spacing):
	
		if y < leftBottomBoundary:
			opositePoint = "[{},{},0],".format(x+trackWidth,y)
			point = ""
		
		elif y == topBoundary:
			if facing == 0:
				point = ""
				opositePoint = "[{},{},0],".format(x+trackWidth,y)
			else:
				point = "[{},{},0],".format(x,y)
				opositePoint = "[{},{},0]],".format(x+trackWidth,y)
		else:
			if facing == 0 and y >= topBoundary - trackWidth :
				point = ""
				opositePoint = opositePoint = "[{},{},0],".format(x+trackWidth,y)
			else:
				point = "[{},{},0],".format(x,y)
				opositePoint = "[{},{},0],".format(x+trackWidth,y)
	
		point += opositePoint
		result += point

	return result

def curvesOnXX(trackWidth,leftBoundary,rightBoundary,spacing,curvatureHeight,curvePeriod,ofset,continuity):

	result = ""
	leftBottom = 0
	rightBottom = 0
	finalX = 0
	distance = 0

	for x in range (leftBoundary,rightBoundary+spacing,spacing):
		
		y = (math.cos(curvePeriod*x)*curvatureHeight) -ofset

		if x == leftBoundary:
			point = "[{},{},0],".format(x,y)
			opositePoint = "[{},{},0],".format(x,y+trackWidth)
		
		elif x == rightBoundary:
			point = "[{},{},0],".format(x,y)
			opositePoint = ""
			distance = x-finalX
			rightBottom = y
		else:

			if x >= rightBoundary-continuity:
				point = "[{},{},0],".format(x,y)
				opositePoint = ""
			else:
				point = "[{},{},0],".format(x,y)
				opositePoint = "[{},{},0],".format(x,y+trackWidth)
				finalX = x
				leftBottom = y+trackWidth
	
		point += opositePoint
		result += point

	return result,leftBottom,rightBottom,finalX,distance


def curvesOnYY(trackWidth,bottomBoundary,topBoundary,spacing,curvatureHeight,curvePeriod,ofset,continuity):

	result = ""
	

	for y in range (bottomBoundary,topBoundary,spacing):
		
		x = (math.cos(curvePeriod*y)*curvatureHeight) - ofset

		if y >= topBoundary - trackWidth +10 or y<= bottomBoundary + trackWidth-10:
			leftPoint =  "[{},{},0],".format(x,y)
			rightPoint = ""
		else:
			leftPoint =  "[{},{},0],".format(x,y)
			rightPoint = "[{},{},0],".format(x+trackWidth,y)


		leftPoint +=rightPoint
		result +=leftPoint

	return result

def main():
	start = "["
	end = "]"

	bottomBottomHorizontalLine = HorizontalStraightLine(-370,145,-200)
	topBottomHorizontalLine = HorizontalStraightLine(-350,145,-200)
	s = lineOnXX(75,bottomBottomHorizontalLine,topBottomHorizontalLine,15)

	t,leftBottom,rightBottom,x,distance = curvesOnXX(75,150,450,15,40,1/40,160,55)
	s += t

	s += lineOnYY(distance,math.floor(leftBottom)+15,math.floor(rightBottom),190,15,x,0)

	topTopHorizontalLine = HorizontalStraightLine(-390,445,130)
	bottomTopHorizontalLine = HorizontalStraightLine(-350,375,130)
	topHorizontalLine = lineOnXX(75,bottomTopHorizontalLine,topTopHorizontalLine,15)
	s+=topHorizontalLine

	leftCurves = curvesOnYY(90,-200,200,15,40,1/40,400,5)
	s+= leftCurves

	s = s[:-1]

	start += s + end

	print(start)

main()