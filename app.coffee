#SETTINGS & MODULES
InputModule = require "input"
XMLHttpRequest = require 'XMLHttpRequest'

initScroll = true
smartConnectIsShowing = false
initButtonSelections = ["Quick Schedule", "Attend Event", "QR Code"]
	

#HOME SCREEN
scroll = new ScrollComponent
	parent: screenA
	x: 0
	y: scrollCmp.y
	width: scrollCmp.width
	height: Screen.height * 3
	backgroundColor: "transparent"
	scrollHorizontal: false

# scrollCmp.y -=80
highlight.parent = scroll.content
List.parent = scroll.content

scroll.contentInset =
	top: 0
	right: 0
	bottom: 185
	left: 0
	
# scrollCmp.parent = scroll.content
# 
scroll.on Events.ScrollEnd, ->
	if initScroll
		scroll.scrollToPoint(
			y: 190
			true
			curve: Bezier.easeOut
			time: 0.1
		)
		initScroll = false;
	else
#SMART CONNECT LAYERS
numOfResponse = 1
responses = []
dialogFlowResponses = []
quickResponseButtons = []
elongatedView = false

dialogFlowResponse = "Sure! Are you open to physical or virtual meetings?"

#DialogFlow API
#change token to your token here
token = "21c4fcd2b3b44c1b9a82da6672cb6f6e"
session = new Date().getTime()

callXMLHttpRequest=(input)->
	sendfunc=(data)->
# 		num = dialogFlowResponses.length
		dialogFlowResponse = data.result.speech
		
	#using sendfunc as callback when response with data is ready
	XMLHttpRequest.send input,sendfunc, token, session
	

overlay = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "black"
	opacity: 0
	visible: false
	
smartConnectLayerTop = new Layer
	y: 320
	width: 360
	height: 320
	backgroundColor: "white"
	opacity: 0
	visible: false
smartConnectIcon = new Layer
	parent: smartConnectLayerTop
	width: 24
	height: 24
	image: "images/smartConnect_icon.png"
	x: 16
	y: 16
smartConnectText = new TextLayer
	parent: smartConnectLayerTop
	text: "Smart Connect"
	fontSize: 20
	fontFamily: "Roboto"
	fontStyle: "Thin"
	x: Align.center
	y: 16
	color: "#3B3B38"
closeIcon = new Layer
	parent: smartConnectLayerTop
	width: 14
	height: 14
	image: "images/close.svg"
	x: Screen.width - 31
	y: 21
conversationScroll = new ScrollComponent
	parent: smartConnectLayerTop
	x: 16
	y: smartConnectIcon.y + smartConnectIcon.height + 20
	width: Screen.width
	height: Screen.height/2 + 100
	backgroundColor: "white"
	scrollHorizontal: false
	
# conversationScroll.scroll = true
conversationScroll.mouseWheelEnabled = true

initHelpTextLayer = new Layer
	parent: conversationScroll.content
	backgroundColor: "white"
	borderWidth: 1
	borderRadius: 100
	borderColor: "#DEDEDE"
	width: 155
	height: 32
	x: 16
	y: 0
# 	y: smartConnectIcon.y + smartConnectIcon.height + 20
	
initHelpText = new TextLayer
	parent: initHelpTextLayer
	text: "Hi, how can I help?"
	fontSize: 14
	x: Align.center
	y: Align.center
	color: "#000000"

smartConnectLayerButtom = new Layer
	y: 551
	width: 360
	height: 90
	backgroundColor: "white"
	opacity: 0
	visible: false
	
createResponseLayers = (responTxt)->
	responseText = new TextLayer
		parent: conversationScroll.content
		backgroundColor: "#FDF8E4"
		borderRadius: 100
		fontSize: 14
		text: responTxt
		x: Align.right(-32)
		y: (numOfResponse * (32 + 16) + (dialogFlowResponses.length) * (32+16))
# 		y: Align.center
		padding: 
			top: 6
			left: 16
			bottom: 6
			right: 16
		color: "#000000"
	responTxt.autoHeight = yes
	responTxt.autoWidth = yes
	
	responses.push(responseText)
	numOfResponse++

#Create DialogFlow Response
createDialogFlowResponseLayers = (responTxt_d)->	
	responseLayer_d = new TextLayer
		parent: conversationScroll.content
		backgroundColor: "white"
		borderRadius: 100
		borderWidth: 1
		borderColor: "#DEDEDE"
		fontSize: 14
		text: responTxt_d
# 		width: 278
		x: Align.left(16)
		y: (numOfResponse * (32 + 16) + dialogFlowResponses.length * (32+16))
		padding: 
			top: 6
			left: 16
			bottom: 6
			right: 16
		color: "#000000"
	responTxt_d.autoHeight = yes
	responTxt_d.autoWidth = yes
	
	dialogFlowResponses.push(responseLayer_d)
		
createResponse = (responTxt) ->
	#handle logic for 
	# 1) Create dynamically TextLayer based on text string length
	createResponseLayers(responTxt)
	# 2) Sending text to DialogFlow api
	callXMLHttpRequest(responTxt)
	# 3) Create response from Dialogflow
	Utils.delay 0.2, ->
		createDialogFlowResponseLayers(dialogFlowResponse)
# 	Utils.delay 0.5, ->
	# 4) Update Scrolling
		conversationScroll.scrollToPoint(
			x: 0,
			y: 500
			true
			curve: Bezier.easeOut, time: 0.2
		)
		
createButtonSelections = (numOfSelections) ->
	for i in [0...numOfSelections]
		button = new Layer
			parent: smartConnectLayerButtom
			x: 16 + (138*i)
			y: smartConnectLayerButtom.height - 95
			width: 130
			height: 32
			backgroundColor: "#FDF8E3"
			borderRadius: 100
		buttonText = new TextLayer
			parent: button
			text: initButtonSelections[i]
			fontSize: 14
			x: Align.center
			y: Align.center
			color: "#3B3B38"
		quickResponseButtons.push(button)
		
		buttonText.onClick ->
			createResponse(this.text)
						
createButtonSelections(3)
buttonMenu = new Layer
	parent: smartConnectLayerButtom
	width: 326
	height: 24
	x: 16
	y: smartConnectLayerButtom.height - 36
	image: "images/buttomMenu.png"
userInputFields = new Layer
	x: 0
	y: 320 - 20
	width: 360
	height: 320
	backgroundColor: "white"
	opacity: 0
	visible: false
textFieldLayer = new Layer
	parent: userInputFields
	y: 10
	width: 360
	height: 48
	image: "images/text_field.png"
input = new InputModule.Input
	parent: textFieldLayer
# 	y: 360# y position
	x: 0  # x position
	width: 360
	height: 30
	virtualKeyboard: false # Enable or disable virtual keyboard for when viewing on computer
	placeholder: "Type a message" 
	setup: false # Change to true when positioning the input so you can see it
	fontSize: 14 # Size in px
	fontFamily: "Roboto" # Font family for placeholder and input text
	textColor: "#000" # Color of the input text
# 	fontWeight: "500" # Font weight for placeholder and input text
	lineHeight: 1 # Line height in em
	tabIndex: 1 # Tab index for the input (default is 0)

input.on 'keyup', (e) ->	
	if e.keyCode == 13 #enter key pressed
		createResponse(@value)
		input.value = ""
	if e.keyCode == 27#escape
		userInputFields.visible = false
		userInputFields.animate
	# 		visible: true
			y: 320 + 20
			opacity: 0
			options: 
				time: 0.1
				curve: Bezier.easeOut
# 		input.unfocus()	
  
fakeKeyboard = new Layer
	parent: userInputFields
	y: textFieldLayer.y + textFieldLayer.height - 10
	width: 360
	height: 272
	image: "images/Keyboard.png"
			
buttonMenu.onClick ->
	#stretch the view before showing keyboard
	if elongatedView == false
		smartConnectLayerTop.animate
			y: 0
			height: Screen.height
			options:
				curve: Bezier.easeOut
				time: 0.2
			
	#Destory previous quickResponses
	for i in [0...quickResponseButtons.length]
		quickResponseButtons[i].destroy()
	#Show keyboard
	userInputFields.visible = true
	userInputFields.animate
# 		visible: true
		y: 320
		opacity: 1
		options: 
			time: 0.2
			curve: Bezier.easeOut
	input.focus()

overlay.onClick ->
	toggleSmartConnect()
closeIcon.onClick ->
	toggleSmartConnect()
	userInputFields.visible = false
	userInputFields.animate
# 		visible: true
		y: 320 + 20
		opacity: 0
		options: 
			time: 0.1
			curve: Bezier.easeOut	
smartConnectLayerTop.onSwipeUp ->
	elongatedView = true
	smartConnectLayerTop.animate
		y: 0
		height: Screen.height
		options:
			curve: Bezier.easeOut
			time: 0.2
			
smartConnectLayerTop.onSwipeDown ->
	elongatedView = false
	smartConnectLayerTop.animate
		y: 320
		height: 320
		options:
			curve: Bezier.easeOut
			time: 0.1
			
	userInputFields.visible = false
	userInputFields.animate
# 		visible: true
		y: 320 + 20
		opacity: 0
		options: 
			time: 0.2
			curve: Bezier.easeOut
	input.unfocus()
			
#MAIN DRIVER
Bottom_Navigation.bringToFront()
FAB.onTap ->
	toggleSmartConnect()
	
toggleSmartConnect = () ->
	if smartConnectIsShowing == false #if smartConnect layer isn't showing
		#display it
		overlay.visible = true
		overlay.animate
			opacity: 0.5
			options: 
				time: 0.3
		smartConnectLayerTop.visible = true
		smartConnectLayerTop.animate
			opacity: 1
			options: 
				time: 0.1
		smartConnectLayerButtom.visible = true
		smartConnectLayerButtom.animate
			opacity: 1
			options: 
				time: 0.1
	else
		overlay.opacity = 0
		overlay.visible = false
		smartConnectLayerTop.opacity = 0
		smartConnectLayerTop.visible = false
		smartConnectLayerButtom.opacity = 0
		smartConnectLayerButtom.visible = false
		
	smartConnectIsShowing=!smartConnectIsShowing
	
		
	
	
	
	



