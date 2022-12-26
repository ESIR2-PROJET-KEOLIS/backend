#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 13 09:42:21 2022

@author: vbillaud
"""

import pika
import json  

#################################################################
#json part
#################################################################
data = {  
    "id": 1,         
    "name": "My Name",         
    "description": "This is description about me"     
} 

message = json.dumps(data)  
################################################################
credentials = pika.PlainCredentials('user', 'password')
#connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'), credentials)

parameters = pika.ConnectionParameters('localhost',
                                   5672,
                                   '/',
                                   credentials)

connection = pika.BlockingConnection(parameters)



channel = connection.channel()

channel.queue_declare(queue='queue_keolis')

channel.basic_publish(exchange='', routing_key='queue_keolis', body=message)
print(" [x] Sent ", message)
connection.close()