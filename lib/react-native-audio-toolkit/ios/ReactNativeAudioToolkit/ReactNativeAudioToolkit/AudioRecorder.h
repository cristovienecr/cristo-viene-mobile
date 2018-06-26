//
//  AudioManager.h
//  ReactNativeAudioToolkit
//
//  Created by Oskar Vuola on 28/06/16.
//  Copyright (c) 2016 Futurice.
//
//  Licensed under the MIT license. For more information, see LICENSE.

#import <Foundation/Foundation.h>
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else // Compatibility for RN version < 0.40
#import "RCTBridgeModule.h"
#endif

@interface AudioRecorder : NSObject <RCTBridgeModule>

@end
